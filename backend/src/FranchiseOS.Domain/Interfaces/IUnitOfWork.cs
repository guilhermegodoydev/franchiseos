namespace FranchiseOS.Domain.Interfaces;

public interface IUnitOfWork
{
    Task CommitAsync();
}