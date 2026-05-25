using FranchiseOS.Domain.Entities;

namespace FranchiseOS.Domain.Interfaces;

public interface IUnitRepository 
{
    Task<IEnumerable<Unit>> GetAllByOfficeAsync(int mainOfficeId);
    Task<Unit> GetByIdAsync(int unitId);

    Task AddAsync(Unit unit);

    Task UpdateAsync(Unit unit);

    Task DeleteAsync(int unitId);
}