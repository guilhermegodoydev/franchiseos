using FranchiseOS.Domain.Entities;

namespace FranchiseOS.Domain.Interfaces;

public interface IUnitRepository 
{
    Task<IEnumerable<Unit>> GetAllByOfficeAsync(Guid mainOfficeId);
    Task<Unit?> GetByIdAsync(Guid unitId);

    Task AddAsync(Unit unit);

    Task UpdateAsync(Unit unit);

    Task DeleteAsync(Guid unitId);
}