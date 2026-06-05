namespace FranchiseOS.Domain.Exceptions;

public class BatchException : DomainException
{
    private BatchException(string message) : base(message) {}

    public static BatchException AlreadyProcessed()
    {
        return new BatchException("Operation already processed");
    }
}