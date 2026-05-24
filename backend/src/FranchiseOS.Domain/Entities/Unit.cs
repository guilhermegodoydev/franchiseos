namespace FranchiseOS.Domain.Entities;

public class Unit {
    public int Id { get; set; }
    public Guid PublicId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string Status { get; set; } = "Active";
    public int MainOfficeId { get; set; }
    public MainOffice MainOffice { get; set; } = null!;

    private decimal _royaltiesPercentage;
    public decimal RoyaltiesPercentage { 
        get { return _royaltiesPercentage; } 
        set {
            if (value <= 0 ) {
                throw new ArgumentException("Royalties percentage cannot be zero or negative.");
            }

            _royaltiesPercentage = value;
        }; 
    };
}