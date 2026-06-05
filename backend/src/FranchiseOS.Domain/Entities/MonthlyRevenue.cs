namespace FranchiseOS.Domain.Entities;

public class MonthlyRevenue {
    public Guid Id { get; private set; } = Guid.CreateVersion7();
    public Guid UnitId { get; private set; } = Guid.CreateVersion7();
    public Unit Unit { get; private set; } = null!;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public int SendedYear { get; private set; }

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