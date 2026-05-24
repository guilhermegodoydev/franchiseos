namespace FranchiseOS.Domain.Entities;

public class SupplyOrder {
    public int Id { get; set; }
    public Guid PublicId { get; set; } = Guid.NewGuid();
    public string Status { get; set; } = "Pending";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int UnitId { get; set; }
    public Unit Unit { get; set; } = null!;

    public ICollection<SupplyOrderItem> Items { get; set; } = new List<SupplyOrderItem>();
}