namespace backend.Exceptions;

public class UnitNameAlreadyExistsException : ConflictException
{
    public UnitNameAlreadyExistsException(string name)
        : base($"Já existe uma unidade com o nome '{name}' nesta matriz.") { }
}