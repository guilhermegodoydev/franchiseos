using FranchiseOS.Domain.Entities;
using FranchiseOS.Domain.Interfaces;

namespace FranchiseOS.Infrastructure.Repositories;

public class SupplyOrderRepository : ISupplyOrderRepository
{
    private readonly ApplicationDbContext _context;

    public SupplyOrderRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(SupplyOrder supplyOrder)
    {
        _context.SupplyOrders.Add(supplyOrder);
        await _context.SaveChangesAsync();
    }
}