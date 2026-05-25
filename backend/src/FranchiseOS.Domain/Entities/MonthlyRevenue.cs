namespace FranchiseOS.Domain.Entities;

public class MonthlyRevenue {
    public int Id { get; set; }
    public Guid PublicId { get; set; }
    public int UnitId { get; set; }
    public Unit Unit { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int SendedYear { get; set; }

    private int _sendedMonth;
    public int SendedMonth {
        get { return _sendedMonth; }
        set {
            if (value < 1 || value > 12) {
                throw new ArgumentException("SendedMonth must be between 1 and 12.");
            }
            _sendedMonth = value;
        }
    }

    private decimal _revenue;
    public decimal Revenue { 
        get { return _revenue; }
        set {
            if (value < 0) {
                throw new ArgumentException("Revenue cannot be negative.");
            }
            _revenue = value;
        } 
    } 
}