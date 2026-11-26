using backend.Entities;
using backend.Infra;

namespace backend.Services;

public class PaymentService
{
    private readonly ApplicationDbContext _context;

    public PaymentService(ApplicationDbContext context)
    {
        _context = context;
    }

    public Payment Create(decimal amount, PayMethodEnum payMethod, DateTimeOffset? payDate)
    {
        var payment = new Payment(amount, payMethod, payDate ?? DateTimeOffset.UtcNow);
        _context.Payments.Add(payment);
        return payment;
    }
}