using backend.Dtos;
using backend.Entities;
using backend.Exceptions;
using backend.Infra;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class RoyaltyService
{
    private const int DueDay = 10;

    private readonly ApplicationDbContext _context;
    private readonly MainOfficeService _officeService;
    private readonly PaymentService _paymentService;

    public RoyaltyService(ApplicationDbContext context, MainOfficeService officeService, PaymentService paymentService)
    {
        _context = context;
        _officeService = officeService;
        _paymentService = paymentService;
    }

    private async Task EnsureOfficeExistsAsync(Guid officeId)
    {
        if (!await _officeService.ExistsAsync(officeId))
            throw new MainOfficeNotFoundExcepetion(officeId);
    }

    private async Task<Royalty> GetOwnedRoyaltyAsync(Guid officeId, Guid royaltyId)
    {
        return await _context.Royalties
            .FirstOrDefaultAsync(r => r.Id == royaltyId && r.Unit.MainOfficeId == officeId)
            ?? throw new RoyaltyNotFoundException(royaltyId);
    }

    public async Task<PagedResultRoyaltiesDto> GetRoyaltiesByOfficeAsync(Guid officeId, int currentPage, int itemsPerPage, StatusRoyaltyEnum? status)
    {
        await EnsureOfficeExistsAsync(officeId);

        var now = DateTimeOffset.UtcNow;
        await _context.Royalties
            .Where(r => r.Unit.MainOfficeId == officeId
                && r.Status == StatusRoyaltyEnum.Pending
                && r.DueDate < now)
            .ExecuteUpdateAsync(s => s.SetProperty(r => r.Status, StatusRoyaltyEnum.Overdue));

        var query = _context.Royalties
            .AsNoTracking()
            .Where(r => r.Unit.MainOfficeId == officeId);

        if (status.HasValue) query = query.Where(r => r.Status == status);

        var totalItems = await query.CountAsync();
        var totalPages = totalItems > 0 ? (int)Math.Ceiling(totalItems / (double)itemsPerPage) : 0;

        var royalties = await query
            .OrderByDescending(r => r.DueDate)
            .ThenBy(r => r.Id)
            .Skip((currentPage - 1) * itemsPerPage)
            .Take(itemsPerPage)
            .Select(r => new RoyaltyForListOwerViewDto(
                r.Id,
                r.Unit.Name,
                r.Status,
                r.Percentage,
                r.Amount,
                r.ReferenceMonth,
                r.ReferenceYear,
                r.Payment != null ? r.Payment.PayDate : (DateTimeOffset?)null,
                r.DueDate
            ))
            .ToListAsync();

        return new PagedResultRoyaltiesDto(royalties, totalItems, totalPages);
    }

    public async Task<int> GenerateRoyaltiesAsync(Guid officeId, int month, int year)
    {
        if (month is < 1 or > 12)
            throw new InvalidRoyaltyException("Mês inválido.");

        await EnsureOfficeExistsAsync(officeId);

        var dueDate = new DateTimeOffset(year, month, 1, 0, 0, 0, TimeSpan.Zero)
            .AddMonths(1)
            .AddDays(DueDay - 1);

        var revenues = await _context.MonthlyRevenues
            .AsNoTracking()
            .Where(m => m.Unit.MainOfficeId == officeId
                && m.Month == month
                && m.Year == year
                && m.Unit.RoyaltiesPercentage != null)
            .Where(m => !_context.Royalties.Any(r =>
                r.UnitId == m.UnitId && r.ReferenceMonth == month && r.ReferenceYear == year))
            .Select(m => new { m.UnitId, m.Revenue, Percentage = m.Unit.RoyaltiesPercentage!.Value })
            .ToListAsync();

        var royalties = revenues
            .Select(x => new Royalty(x.UnitId, x.Revenue, x.Percentage, month, year, dueDate))
            .ToList();

        _context.Royalties.AddRange(royalties);
        await _context.SaveChangesAsync();

        return royalties.Count;
    }

    public async Task<PaymentDto> MarkAsPaidAsync(Guid officeId, Guid royaltyId, PayMethodEnum payMethod, DateTimeOffset? payDate)
    {
        var royalty = await GetOwnedRoyaltyAsync(officeId, royaltyId);

        var payment = _paymentService.Create(royalty.Amount, payMethod, payDate);
        royalty.MarkAsPaid(payment);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            throw new AlreadyPaidRoyaltyException();
        }

        return new PaymentDto(payment.Id, payment.Amount, payment.PayMethod, payment.PayDate);
    }

    public async Task<PaymentDto?> GetPaymentAsync(Guid officeId, Guid royaltyId)
    {
        var royalty = await _context.Royalties
            .AsNoTracking()
            .Include(r => r.Payment)
            .FirstOrDefaultAsync(r => r.Id == royaltyId && r.Unit.MainOfficeId == officeId)
            ?? throw new RoyaltyNotFoundException(royaltyId);

        return royalty.Payment is null
            ? null
            : new PaymentDto(royalty.Payment.Id, royalty.Payment.Amount, royalty.Payment.PayMethod, royalty.Payment.PayDate);
    }

    public async Task CancelAsync(Guid officeId, Guid royaltyId, string reason)
    {
        var royalty = await GetOwnedRoyaltyAsync(officeId, royaltyId);

        royalty.Cancel(reason, DateTimeOffset.UtcNow);

        await _context.SaveChangesAsync();
    }
}