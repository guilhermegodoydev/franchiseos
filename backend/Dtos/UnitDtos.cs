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
    int TotalItems
);