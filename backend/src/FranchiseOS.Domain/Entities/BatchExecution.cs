namespace FranchiseOS.Domain.Entities;

public class BatchExecution {
    public Guid Id { get; private set; } = Guid.CreateVersion7();
    public DateTime ExecutionDate { get; private set; } = DateTime.UtcNow;
    public int ReferenceMonth { get; private set; }
    public int ReferenceYear { get; private set; }
    public string ExecutionStatus { get; private set; } = "Success";
    public string ActionLogs { get; private set; }

    protected BatchExecution() {}

    public BatchExecution(int month, int year, int totalInvoices, decimal totalAmount, string exStatus, string actionLogs)
    {
        ReferenceMonth = month;
        ReferenceYear = year;
        TotalInvoicesGenerated = totalInvoices;
        TotalAmountGenerated = totalAmount;
        ExecutionStatus = exStatus;
        ActionLogs = actionLogs;
    }

    private int _totalInvoicesGenerated;
    public int TotalInvoicesGenerated {
        get { return _totalInvoicesGenerated; }
        private set {
            if (value < 0) {
                throw new ArgumentException("TotalInvoicesGenerated cannot be negative.");
            }
            _totalInvoicesGenerated = value;
        }
    }

    private decimal _totalAmountGenerated;
    public decimal TotalAmountGenerated {
        get { return _totalAmountGenerated; }
        private set {
            if (value < 0) {
                throw new ArgumentException("TotalAmountGenerated cannot be negative.");
            }
            _totalAmountGenerated = value;
        }
    }
}