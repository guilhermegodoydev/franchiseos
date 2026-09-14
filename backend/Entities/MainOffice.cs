namespace backend.Entities;

public class MainOffice {
    public Guid Id { get; private set; } = Guid.CreateVersion7();
    public string Cnpj { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public bool IsDeleted { get; private set; } = false;

    public ICollection<Unit> Units { get; private set; } = new List<Unit>();
    
    public MainOffice() { }

    public MainOffice(Guid id, string cnpj, string name, bool isDeleted) {
        this.Id = id;
        this.Cnpj = cnpj;
        this.Name = name;
        this.IsDeleted = isDeleted;
    }

    public void Delete() {
        this.IsDeleted = true;
    }
}