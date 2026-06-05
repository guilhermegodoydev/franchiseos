using FranchiseOS.Domain.Entities;
using FranchiseOS.Domain.Interfaces;
using FranchiseOS.Domain.Exceptions;

namespace FranchiseOS.Application.Services;

public class SupplyOrderService
{
    private readonly ISupplyOrderRepository _supplyRepo;
    private readonly IRoyaltyBillingRepository _royaltyRepo;

    public SupplyOrderService(ISupplyOrderRepository supplyRepo, IRoyaltyBillingRepository royaltyRepo)
    {
        _supplyRepo = supplyRepo;
        _royaltyRepo = royaltyRepo;
    }

    public async Task AddAsync(SupplyOrder supplyOrder)
    {
        var hasPendentPayment = await _royaltyRepo.HasPastDueBillingsAsync(supplyOrder.UnitId);

        if (hasPendentPayment)
            throw SupplyOrderException.UnitIsDefaulting();

        await _supplyRepo.AddAsync(supplyOrder);
    }
}