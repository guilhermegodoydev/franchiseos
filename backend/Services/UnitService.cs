using backend.Dtos;
using backend.Entities;
using backend.Exceptions;
using backend.Infra;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class UnitService {
    private readonly ApplicationDbContext _context;
    private readonly MainOfficeService _mainOfficeService;

    public UnitService(ApplicationDbContext context, MainOfficeService mfService) {
        this._context = context;
        this._mainOfficeService = mfService;
    }

    public async Task<PagedResultUnitsDto?> GetUnitsOfficeAsync(
        Guid mainofficeId, 
        int currentPage,
        int itemsPerPage,
        StatusEnum? status, 
        SizeEnum? size, 
        string? state, 
        string? city,
        string? searchName
    ) {
        var officeExists = await _mainOfficeService.ExistsAsync(mainofficeId);

        if (!officeExists) throw new MainOfficeNotFoundExcepetion(mainofficeId);

        var query = _context.Units.AsNoTracking().Where(u => u.MainOfficeId == mainofficeId);

        if (status.HasValue) query = query.Where(u => u.Status == status.Value);
        if (size.HasValue) query = query.Where(u => u.Size == size.Value);
        if (!string.IsNullOrWhiteSpace(state)) query = query.Where(u => EF.Functions.ILike(u.State, $"%{state}%"));
        if (!string.IsNullOrWhiteSpace(city)) query = query.Where(u => EF.Functions.ILike(u.City, $"%{city}%"));
        if (!string.IsNullOrWhiteSpace(searchName)) query = query.Where(u => EF.Functions.ILike(u.Name, $"%{searchName}%"));

        var totalItems = await query.CountAsync();

        var items = await query
            .Skip((currentPage - 1) * itemsPerPage)
            .Take(itemsPerPage)
            .Select(u => new UnitForListDto(
                u.Id,
                u.Name,
                u.Status,
                u.Size,
                u.City,
                u.State,
                u.Revenue
            ))
            .ToListAsync();

        return new PagedResultUnitsDto(items, totalItems);
    }
}