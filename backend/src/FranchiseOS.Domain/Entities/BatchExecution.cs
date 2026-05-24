namespace FranchiseOS.Domain.Entities;

public class BatchExecution {
    public int Id { get; set; }
    public DateTime ExecutionDate { get; set; } = DateTime.UtcNow;
    public int ReferenceMonth { get; set; }
    public int ReferenceYear { get; set; }
    public string ExecutionStatus { get; set; } = "Success";
    public string ActionLogs { get; set; }

    private int _totalInvoicesGenerated;
    public int TotalInvoicesGenerated {
        get { return _totalInvoicesGenerated; }
        set {
            if (value < 0) {
                throw new ArgumentException("TotalInvoicesGenerated cannot be negative.");
            }
            _totalInvoicesGenerated = value;
        }
    }

    private decimal _totalAmountGenerated;
    public decimal TotalAmountGenerated {
        get { return _totalAmountGenerated; }
        set {
            if (value < 0) {
                throw new ArgumentException("TotalAmountGenerated cannot be negative.");
            }
            _totalAmountGenerated = value;
        }
    }
}