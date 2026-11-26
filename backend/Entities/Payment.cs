using backend.Exceptions;

namespace backend.Entities;

public class Payment
{
    public Guid Id { get; private set; }
    public decimal Amount { get; private set; }
    public PayMethodEnum PayMethod { get; private set; }
    public DateTimeOffset PayDate { get; private set; }

    private Payment() { }

    public Payment(decimal amount, PayMethodEnum payMethod, DateTimeOffset payDate)
    {
        if (amount < 0)
            throw new InvalidRoyaltyException("O valor do pagamento não pode ser negativo.");
        if (!Enum.IsDefined(payMethod))
            throw new InvalidRoyaltyException("Forma de pagamento inválida.");

        Id = Guid.CreateVersion7();
        Amount = amount;
        PayMethod = payMethod;
        PayDate = payDate.ToUniversalTime();
    }
}