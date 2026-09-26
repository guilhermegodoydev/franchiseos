namespace backend.Exceptions;

public abstract class NotFoundException : Exception {
    protected NotFoundException(string message) : base(message) { }
}

public abstract class ConflictException : Exception {
    protected ConflictException(string message) : base(message) { }
}