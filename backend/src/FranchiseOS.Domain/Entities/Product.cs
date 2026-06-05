namespace FranchiseOS.Domain.Entities;

public class Product {
    public Guid Id { get; private set; } = Guid.CreateVersion7();
    public string Name { get; private set; } = string.Empty;

    private int _weight;
    public int Weight {
        get { return _weight; }
        set {
            if (value < 0) {
                throw new ArgumentException("Weight cannot be negative.");
            }
            _weight = value;
        }
    }

    private decimal _value;
    public decimal Value {
        get { return _value; }
        set {
            if (value < 0) {
                throw new ArgumentException("Value cannot be negative.");
            }
            _value = value;
        }
    }
}