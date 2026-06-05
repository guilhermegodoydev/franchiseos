using FranchiseOS.Domain.Entities;
using FranchiseOS.Domain.Interfaces;

namespace FranchiseOS.Application.Services;

public class MonthlyRevenueService
{
    private readonly IMonthlyRevenueRepository _repo;

    public MonthlyRevenueService(IMonthlyRevenueRepository repo)
    {
        _repo = repo;
    }

    public async Task AddAsync(MonthlyRevenue monthlyRevenue)
    {
        await _repo.AddAsync(monthlyRevenue);
    }
    public async Task<IEnumerable<MonthlyRevenue>> GetAllByUnitAsync(Guid unitId)
    {
        return await _repo.GetAllByUnitAsync(unitId);
    }
}