using backend.Entities;

namespace backend.Dtos;

public record PaymentDto(Guid Id, decimal Amount, PayMethodEnum PayMethod, DateTimeOffset PayDate);