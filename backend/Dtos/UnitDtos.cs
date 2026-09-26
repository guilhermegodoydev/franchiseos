using System.ComponentModel.DataAnnotations;
using backend.Entities;

namespace backend.Dtos;

public record UnitForListDto (
    Guid Id,
    string Name,
    StatusEnum Status,
    SizeEnum Size,
    string City,
    string State,
    decimal Revenue
);

public record PagedResultUnitsDto (
    IEnumerable<UnitForListDto> Items,
    int TotalItems,
    int TotalPages
);

public record MostRevenueInMonth (
    string Name,
    decimal Revenue
);

public record MetricsUnitsDto (
    MostRevenueInMonth MostRevenue,
    decimal Decrease,
    string Health
);

public record CreateUnitDto(
    [Required, StringLength(150, MinimumLength = 3)] string Name,
    [Required] StatusEnum Status,
    [Required] SizeEnum Size,
    [Required] TypeEnum Type,
    [Required, StringLength(9, MinimumLength = 8)] string Cep,
    [Required, StringLength(200)] string Street,
    [Required, StringLength(20)] string Number,
    [Required, StringLength(100)] string Neighborhood,
    [Required, StringLength(100, MinimumLength = 2)] string City,
    [Required, StringLength(2, MinimumLength = 2)] string State,
    [Range(1, 100, ErrorMessage = "Royalties deve estar entre 1 e 100")] decimal? RoyaltiesPercentage
);