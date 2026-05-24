namespace FranchiseOS.Domain.Entities;

public class MainOffice {
    public int Id { get; set; }
    public Guid PublicId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Cnpj { get; set; } = string.Empty;
}