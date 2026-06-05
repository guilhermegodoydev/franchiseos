namespace FranchiseOS.Domain.Entities;

public class RoyaltyBilling {
    public Guid Id { get; private set; } = Guid.CreateVersion7();
    public Guid MonthlyRevenueId { get; private set; } = Guid.CreateVersion7();
    public MonthlyRevenue MonthlyRevenue { get; private set; } = null!;
    public string PaymentStatus { get; private set; } = "Pending";
    public DateTime DueDate { get; private set; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    protected RoyaltyBilling() { }

    public RoyaltyBilling(Guid monthlyRevenueId, decimal calculatedAmount, decimal royaltiesPercentage)
    {
        MonthlyRevenueId = monthlyRevenueId;
        CalculatedAmount = calculatedAmount;
        RoyaltiesPercentage = royaltiesPercentage;
        DueDate = DateTime.UtcNow.AddDays(10);
    }

    private decimal _calculatedAmount;
    public decimal CalculatedAmount { 
        get { return _calculatedAmount; } 
        set {
            if (value < 0) {
                throw new ArgumentException("CalculatedAmount cannot be negative.");
            }
            _calculatedAmount = value;
        } 
    }

    private decimal _royaltiesPercentage;
    public decimal RoyaltiesPercentage {
        get { return _royaltiesPercentage; } 
        set {
            if (value <= 0) {
                throw new ArgumentException("RoyaltiesPercentage cannot be zero or negative.");
            }
            _royaltiesPercentage = value;
        }
    }
}