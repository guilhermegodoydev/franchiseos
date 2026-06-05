using FranchiseOS.Domain.Entities;
using FranchiseOS.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FranchiseOS.Infrastructure.Repositories;

public class MonthlyRevenueRepository : IMonthlyRevenueRepository
{
    private readonly ApplicationDbContext _context;

    public MonthlyRevenueRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(MonthlyRevenue monthlyRevenue)
    {
        await _context.MonthlyRevenues.AddAsync(monthlyRevenue);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<MonthlyRevenue>> GetAllByUnitAsync(Guid unitId)
    {
        return await _context.MonthlyRevenues.Where(mr => mr.UnitId == unitId).ToListAsync();
    }

    public async Task<IEnumerable<MonthlyRevenue>> GetAllByMonthAndOffice(Guid mainOfficeId, int month, int year)
    {
        return await _context.MonthlyRevenues.Include(mr => mr.Unit).Where(mr => 
            mr.SendedMonth == month && 
            mr.SendedYear == year &&
            mr.Unit.MainOfficeId == mainOfficeId &&
            mr.Unit.Status == "Active"
        ).ToListAsync();
    }
}