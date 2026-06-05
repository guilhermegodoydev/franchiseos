using FranchiseOS.Domain.Entities;
using FranchiseOS.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FranchiseOS.Infrastructure.Repositories;

public class RoyaltyBillingRepository : IRoyaltyBillingRepository
{
    private readonly ApplicationDbContext _context;

    public RoyaltyBillingRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> HasPastDueBillingsAsync(Guid unitId)
    {
        return await _context.RoyaltyBillings.AnyAsync(r => r.MonthlyRevenue.UnitId == unitId && r.PaymentStatus == "Overdue");
    }

    public async Task AddRangeAsync(IEnumerable<RoyaltyBilling> royaltyBillings)
    {
        _context.RoyaltyBillings.AddRange(royaltyBillings);
        await Task.CompletedTask;
    }
}