using FranchiseOS.Domain.Entities;

namespace FranchiseOS.Domain.Interfaces;

public interface IRoyaltyBillingRepository
{
    Task<bool> HasPastDueBillingsAsync(Guid unitId);
    Task AddRangeAsync(IEnumerable<RoyaltyBilling> royaltyBillings);
}