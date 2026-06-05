using FranchiseOS.Domain.Entities;
using FranchiseOS.Domain.Interfaces;

namespace FranchiseOS.Infrastructure.Repositories;

public class MainOfficeRepository : IMainOfficeRepository
{
    private readonly ApplicationDbContext _context;

    public MainOfficeRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<MainOffice?> GetByIdAsync(Guid id)
    {
        return await _context.MainOffices.FindAsync(id);
    }
}