using backend.Infra;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class MainOfficeService {
    private readonly ApplicationDbContext _context;

    public MainOfficeService(ApplicationDbContext context) {
        this._context = context;
    }
    
    public async Task<bool> ExistsAsync(Guid mainofficeId) {
        return await _context.MainOffices.AnyAsync(m => m.Id == mainofficeId);
    }
}