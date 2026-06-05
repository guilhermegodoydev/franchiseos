using FranchiseOS.Domain.Entities;
using FranchiseOS.Domain.Interfaces;

namespace FranchiseOS.Application.Services;

public class MainOfficeService
{
    private readonly IMainOfficeRepository _mainOfficeRepository;

    public MainOfficeService(IMainOfficeRepository repo)
    {
        _mainOfficeRepository = repo;
    }

    public async Task<MainOffice?> GetByIdAsync(Guid id)
    {
        return await _mainOfficeRepository.GetByIdAsync(id);
    }
}