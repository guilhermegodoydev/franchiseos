namespace backend.Exceptions;

public class RoyaltyNotFoundException : NotFoundException
{
    public RoyaltyNotFoundException(Guid id) :  base($"Royaltie com ID: '{id}' não encontrado.") { }
}

public class InvalidDeleteRoyaltyException : InvalidOperationDomainException
{
    public InvalidDeleteRoyaltyException() : base("Royalties pagos não podem ser excluídos.") { }
}

public class AlreadyPaidRoyaltyException : InvalidOperationDomainException
{
    public AlreadyPaidRoyaltyException() : base("Este royalty já foi pago.") { }
}

public class InvalidRoyaltyException : InvalidOperationDomainException
{
    public InvalidRoyaltyException(string message) : base(message) { }
}