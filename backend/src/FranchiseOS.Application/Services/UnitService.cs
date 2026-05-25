using FranchiseOS.Domain.Entities;
using FranchiseOS.Domain.Interfaces;

namespace FranchiseOS.Application.Services;

public class UnitService
{
    private readonly IUnitRepository _unitRepository;

    public UnitService(IUnitRepository unitRepository)
    {
        _unitRepository = unitRepository;
    }

    public async Task<IEnumerable<Unit>> GetUnitsOfficeAsync(int mainOfficeId)
    {
        return await _unitRepository.GetAllByOfficeAsync(mainOfficeId);
    }

    public async Task<Unit> GetUnitByIdAsync(int unitId)
    {
        return await _unitRepository.GetByIdAsync(unitId);
    }

    public async Task CreateUnitAsync(Unit unit)
    {
        await _unitRepository.AddAsync(unit);
    }

    public async Task UpdateUnitAsync(Unit unit)
    {
        await _unitRepository.UpdateAsync(unit);
    }

    public async Task DeleteUnitAsync(int unitId)
    {
        await _unitRepository.DeleteAsync(unitId);
    }
}