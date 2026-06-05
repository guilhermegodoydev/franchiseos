namespace FranchiseOS.Domain.Entities;

public class SupplyOrder {
    public Guid Id { get; private set; } = Guid.CreateVersion7();
    public string Status { get; private set; } = "Pending";
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public Guid UnitId { get; private set; } = Guid.CreateVersion7();
    public Unit Unit { get; private set; } = null!;

    public ICollection<SupplyOrderItem> Items { get; private set; } = new List<SupplyOrderItem>();
}