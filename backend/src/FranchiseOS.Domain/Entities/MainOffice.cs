namespace FranchiseOS.Domain.Entities;

public class MainOffice {
    public Guid Id { get; private set; } = Guid.CreateVersion7();
    public string Name { get; private set; } = string.Empty;
    public string Cnpj { get; private set; } = string.Empty;
}