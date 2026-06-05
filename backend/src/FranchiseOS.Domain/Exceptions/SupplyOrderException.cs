namespace FranchiseOS.Domain.Exceptions;

public class SupplyOrderException : DomainException
{
    private SupplyOrderException(string message) : base(message) { }

    public static SupplyOrderException UnitIsDefaulting()
    {
        return new SupplyOrderException("Operation aborted: The unit has past due royalty billings.");
    }
}