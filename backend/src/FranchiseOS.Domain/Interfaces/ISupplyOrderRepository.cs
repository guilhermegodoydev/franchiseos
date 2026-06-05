using FranchiseOS.Domain.Entities;

namespace FranchiseOS.Domain.Interfaces;

public interface ISupplyOrderRepository
{
    Task AddAsync(SupplyOrder supplyOrder);
}