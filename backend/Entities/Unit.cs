namespace backend.Entities;

public class Unit {
    public Guid Id { get; private set; } = Guid.CreateVersion7();
    public string Name { get; private set; } = string.Empty;
    public StatusEnum Status { get; private set; } = StatusEnum.ATIVA;
    public SizeEnum Size { get; private set; } = SizeEnum.PEQUENA;

    public string Cep { get; private set; } = string.Empty;
    public string Street { get; private set; } = string.Empty;
    public string Number { get; private set; } = string.Empty;
    public string Neighborhood { get; private set; } = string.Empty;
    public string City { get; private set; } = string.Empty;
    public string State { get; private set; } = string.Empty;

    //ATRIBUTO TEMPORARIO PARA MVP
    public double Revenue { get; private set; } = 0.00;

    public Guid MainOfficeId { get; private set; }
    public MainOffice MainOffice { get; private set; } = null!;

    private Unit() { }

    public Unit(string name, StatusEnum status, SizeEnum size, string cep, string street, string number, string neighborhood, string city, string state, Guid mainOfficeId)
    {
        if (string.IsNullOrWhiteSpace(name)) throw new ArgumentException("Erro: Nome é obrigatório.");
        if (string.IsNullOrWhiteSpace(cep)) throw new ArgumentException("Erro: CEP é obrigatório.");
        if (string.IsNullOrWhiteSpace(street)) throw new ArgumentException("Erro: Rua é obrigatória.");
        if (string.IsNullOrWhiteSpace(number)) throw new ArgumentException("Erro: Número é obrigatório.");
        if (string.IsNullOrWhiteSpace(neighborhood)) throw new ArgumentException("Erro: Bairro é obrigatório.");
        if (string.IsNullOrWhiteSpace(city)) throw new ArgumentException("Erro: Cidade é obrigatória.");
        if (string.IsNullOrWhiteSpace(state)) throw new ArgumentException("Erro: Estado é obrigatório.");
        if (mainOfficeId == Guid.Empty) throw new ArgumentException("Erro: É necessário vincular a uma Matriz válida.");

        Id = Guid.CreateVersion7();
        Name = name;
        Status = status;
        Size = size;
        Cep = cep;
        Street = street;
        Number = number;
        Neighborhood = neighborhood;
        City = city;
        State = state;
        MainOfficeId = mainOfficeId;
    }
}