namespace backend.Entities;

public class Unit {
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public StatusEnum Status { get; private set; } = StatusEnum.Active;
    public SizeEnum Size { get; private set; }
    public TypeEnum Type { get; private set; }

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

    public Unit(
        string name, 
        StatusEnum status, 
        SizeEnum size, 
        TypeEnum type,
        string cep, 
        string street, 
        string number, 
        string neighborhood, 
        string city, 
        string state, 
        Guid mainOfficeId
    )
    {
        if (string.IsNullOrWhiteSpace(name)) throw new ArgumentException("Erro: Nome é obrigatório.");
        if (string.IsNullOrWhiteSpace(cep)) throw new ArgumentException("Erro: CEP é obrigatório.");
        if (string.IsNullOrWhiteSpace(street)) throw new ArgumentException("Erro: Rua é obrigatória.");
        if (string.IsNullOrWhiteSpace(number)) throw new ArgumentException("Erro: Número é obrigatório.");
        if (string.IsNullOrWhiteSpace(neighborhood)) throw new ArgumentException("Erro: Bairro é obrigatório.");
        if (string.IsNullOrWhiteSpace(city)) throw new ArgumentException("Erro: Cidade é obrigatória.");
        if (string.IsNullOrWhiteSpace(state)) throw new ArgumentException("Erro: Estado é obrigatório.");
        if (mainOfficeId == Guid.Empty) throw new ArgumentException("Erro: É necessário vincular a uma Matriz válida.");

        if (!Enum.IsDefined(status)) throw new ArgumentException("Erro: Status inválido.");
        if (!Enum.IsDefined(size)) throw new ArgumentException("Erro: Porte (Size) inválido.");
        if (!Enum.IsDefined(type)) throw new ArgumentException("Erro: Tipo inválido.");

        Id = Guid.CreateVersion7();
        Name = name;
        Status = status;
        Size = size;
        Type = type;
        Cep = cep;
        Street = street;
        Number = number;
        Neighborhood = neighborhood;
        City = city;
        State = state;
        MainOfficeId = mainOfficeId;
}
}