namespace backend.Exceptions;

public abstract class NotFoundException : Exception {
    protected NotFoundException(string message) : base(message) { }
}

public abstract class ConflictException : Exception {
    protected ConflictException(string message) : base(message) { }
}

public abstract class InvalidOperationDomainException : Exception
{
    protected InvalidOperationDomainException(string message) : base(message) { }
}