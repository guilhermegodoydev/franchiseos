using FranchiseOS.Domain.Entities;

namespace FranchiseOS.Domain.Interfaces;

public interface IMainOfficeRepository
{
    Task<MainOffice?> GetByIdAsync(Guid mainfOfficeId);
}