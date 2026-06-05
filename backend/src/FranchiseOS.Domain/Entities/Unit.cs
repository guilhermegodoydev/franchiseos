namespace FranchiseOS.Domain.Entities;

public class Unit {
    public Guid Id { get; private set; } = Guid.CreateVersion7();
    public string Name { get; private set; } = string.Empty;
    public string City { get; private set; } = string.Empty;
    public string State { get; private set; } = string.Empty;
    public string Status { get; private set; } = "Active";
    public Guid MainOfficeId { get; private set; } = Guid.CreateVersion7();
    public MainOffice MainOffice { get; private set; } = null!;

    private decimal _royaltiesPercentage;
    public decimal RoyaltiesPercentage { 
        get { return _royaltiesPercentage; } 
        set {
            if (value <= 0 ) {
                throw new ArgumentException("Royalties percentage cannot be zero or negative.");
            }

            _royaltiesPercentage = value;
        }
    }
}