namespace FranchiseOS.Domain.Entities;

public class SupplyOrderItem { 
    public Guid SupplyOrderId { get; private set; } = Guid.CreateVersion7();
    public SupplyOrder SupplyOrder { get; private set; } = null!;
    public Guid ProductId { get; private set; } = Guid.CreateVersion7();
    public Product Product { get; private set; } = null!;
    
    private decimal _priceAtOrder;
    public decimal PriceAtOrder {
        get { return _priceAtOrder; }
        set {
            if (value < 0) {
                throw new ArgumentException("Price cannot be negative.");
            }
            _priceAtOrder = value;
        }
    }

    private int _quantity;
    public int Quantity {
        get { return _quantity; }
        set {
            if (value < 0) {
                throw new ArgumentException("Quantity cannot be negative.");
            }
            _quantity = value;
        }
    }
}