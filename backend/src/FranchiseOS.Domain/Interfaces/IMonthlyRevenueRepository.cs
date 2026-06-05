using FranchiseOS.Domain.Entities;

namespace FranchiseOS.Domain.Interfaces;

public interface IMonthlyRevenueRepository
{
    Task AddAsync(MonthlyRevenue monthlyRevenue);
    Task<IEnumerable<MonthlyRevenue>> GetAllByUnitAsync(Guid unitId);
    Task<IEnumerable<MonthlyRevenue>> GetAllByMonthAndOffice(Guid mainOfficeId, int month, int year);
}