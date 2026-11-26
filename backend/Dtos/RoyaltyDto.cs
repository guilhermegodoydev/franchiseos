using System.ComponentModel.DataAnnotations;
using backend.Entities;

namespace backend.Dtos;

public record RoyaltyForListOwerViewDto(
    Guid Id,
    string UnitName,
    StatusRoyaltyEnum Status,
    decimal Percentage,
    decimal Amount,
    int ReferenceMonth,
    int ReferenceYear,
    DateTimeOffset? PayDate,
    DateTimeOffset DueDate
);

public record PagedResultRoyaltiesDto(
    IEnumerable<RoyaltyForListOwerViewDto> Royalties,
    int TotalItems,
    int TotalPages
);

public record GenerateRoyaltiesDto(int Month, int Year);
public record PayRoyaltyDto([Required] PayMethodEnum? PayMethod, DateTimeOffset? PayDate);
public record CancelRoyaltyDto(string Reason);