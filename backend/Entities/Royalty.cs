using backend.Exceptions;

namespace backend.Entities;

public class Royalty
{
    public Guid Id { get; private set; }
    public decimal Amount { get; private set; }
    public decimal Percentage { get; private set; }
    public int ReferenceMonth { get; private set; }
    public int ReferenceYear { get; private set; }
    public DateTimeOffset? PayDate { get; private set; }
    public DateTimeOffset DueDate { get; private set; }
    public StatusRoyaltyEnum Status { get; private set; }
    public DateTimeOffset? CancelledAt { get; private set; }
    public string? CancelReason { get; private set; }

    public Guid? PaymentId { get; private set; }
    public Payment? Payment { get; private set; }

    public Guid UnitId { get; private set; }
    public Unit Unit { get; private set; } = null!;

    private Royalty() { }

    public Royalty(Guid unitId, decimal revenue, decimal percentage, int referenceMonth, int referenceYear, DateTimeOffset dueDate)
    {
        Validate(revenue, percentage, referenceMonth);

        Id = Guid.CreateVersion7();
        UnitId = unitId;
        Percentage = percentage;
        Amount = Math.Round(revenue * percentage / 100m, 2);
        ReferenceMonth = referenceMonth;
        ReferenceYear = referenceYear;
        DueDate = dueDate;
        Status = StatusRoyaltyEnum.Pending;
    }

    public void MarkAsPaid(Payment payment)
    {
        if (Status == StatusRoyaltyEnum.Paid)
            throw new AlreadyPaidRoyaltyException();
        if (Status == StatusRoyaltyEnum.Cancelled)
            throw new InvalidRoyaltyException("Royalty cancelado não pode ser pago.");

        Payment = payment;
        Status = StatusRoyaltyEnum.Paid;
    }

    private static void Validate(decimal revenue, decimal percentage, int referenceMonth)
    {
        if (revenue < 0)
            throw new InvalidRoyaltyException("O faturamento não pode ser negativo.");
        if (percentage is < 1 or > 100)
            throw new InvalidRoyaltyException("O percentual deve estar entre 1 e 100.");
        if (referenceMonth is < 1 or > 12)
            throw new InvalidRoyaltyException("Mês de referência inválido.");
    }
    
    public void Cancel(string reason, DateTimeOffset cancelledAt)
    {
        if (Status == StatusRoyaltyEnum.Paid)
            throw new InvalidRoyaltyException("Royalty pago não pode ser cancelado.");
        if (Status == StatusRoyaltyEnum.Cancelled)
            throw new InvalidRoyaltyException("Royalty já está cancelado.");
        if (string.IsNullOrWhiteSpace(reason))
            throw new InvalidRoyaltyException("Informe o motivo do cancelamento.");

        Status = StatusRoyaltyEnum.Cancelled;
        CancelledAt = cancelledAt.ToUniversalTime();
        CancelReason = reason.Trim();
    }
}