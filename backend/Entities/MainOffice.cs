namespace backend.Entities;

public class MainOffice {
    public Guid Id { get; private set; } = Guid.CreateVersion7();
    public string Cnpj { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public bool IsDeleted { get; private set; } = false;

    public ICollection<Unit> Units { get; private set; } = new List<Unit>();

    public void Delete() {
        this.IsDeleted = true;
    }
}