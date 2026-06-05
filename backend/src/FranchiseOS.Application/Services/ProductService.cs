using FranchiseOS.Domain.Entities;
using FranchiseOS.Domain.Interfaces;

namespace FranchiseOS.Application.Services;

public class ProductService
{
    private readonly IProductRepository _repo;

    public ProductService(IProductRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await _repo.GetAllAsync();
    }

    public async Task<Product?> GetByIdAsync(Guid id)
    {
        return await _repo.GetByIdAsync(id);
    }
}