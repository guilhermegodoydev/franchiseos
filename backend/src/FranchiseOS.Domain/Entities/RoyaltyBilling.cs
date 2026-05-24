namespace FranchiseOS.Domain.Entities;

public class RoyaltyBilling {
    public int Id { get; set; }
    public Guid PublicId { get; set; }
    public int MonthlyRevenueId { get; set; }
    public MonthlyRevenue MonthlyRevenue { get; set; } = null!;
    public string PaymentStatus { get; set; } = "Pending";
    public DateTime DueDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    private decimal _calculatedAmount;
    public decimal CalculatedAmount { 
        get { return _calculatedAmount; }; 
        set {
            if (value < 0) {
                throw new ArgumentException("CalculatedAmount cannot be negative.");
            }
            _calculatedAmount = value;
        }; 
    }

    private decimal _royaltiesPercentage;
    public decimal RoyaltiesPercentage {
        get { return _royaltiesPercentage; }; 
        set {
            if (value <= 0) {
                throw new ArgumentException("RoyaltiesPercentage cannot be zero or negative.");
            }
            _royaltiesPercentage = value;
        };
    }
}