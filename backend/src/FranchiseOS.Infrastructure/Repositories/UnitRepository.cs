using Microsoft.EntityFrameworkCore;
using FranchiseOS.Domain.Entities;
using FranchiseOS.Domain.Interfaces;

namespace FranchiseOS.Infrastructure.Repositories;

public class UnitRepository : IUnitRepository 
{
    private readonly ApplicationDbContext _context;

    public UnitRepository(ApplicationDbContext context) 
    {
        _context = context;
    }

    public async Task<IEnumerable<Unit>> GetAllByOfficeAsync(Guid mainOfficeId) 
    {
        return await _context.Units.Where(unit => unit.MainOfficeId == mainOfficeId).ToListAsync();
    }

    public async Task<Unit?> GetByIdAsync(Guid unitId) 
    {
        return await _context.Units.FindAsync(unitId);
    }

    public async Task AddAsync(Unit unit) 
    {
        await _context.Units.AddAsync(unit);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Unit unit)
    {
        _context.Units.Update(unit);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid unitId)
    {
        await _context.Units.Where(unit => unit.Id == unitId).ExecuteDeleteAsync();
    }
}