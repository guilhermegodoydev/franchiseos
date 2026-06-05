namespace FranchiseOS.Domain.Exceptions;

public class MonthlyRevException : DomainException
{
    private MonthlyRevException(string message) : base(message) {}

    public static MonthlyRevException NoRevenuesDeclared()
    {
        return new MonthlyRevException("Processing aborted: No monthly revenues were found for the specified period.");
    }
}