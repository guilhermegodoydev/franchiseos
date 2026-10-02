namespace backend.Exceptions;

public class UnitNameAlreadyExistsException : ConflictException
{
    public UnitNameAlreadyExistsException(string name)
        : base($"Já existe uma unidade com o nome '{name}' nesta matriz.") { }
}

public class UnitNotFoundException :  NotFoundException
{
    public UnitNotFoundException(Guid id) : base ($"Unidade com o ID {id} não encontrada.") { }
}

public class InactiveUnitOperationException : InvalidOperationDomainException
{
    public InactiveUnitOperationException(string name) : base($"Operação inválida: A unidade {name} está inativa e não permite alterações.") { }
}