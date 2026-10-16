namespace backend.Exceptions;

public class InvalidCredentialsException : UnauthorizedException
{
    public InvalidCredentialsException() : base("E-mail ou senha inválidos.") { }
}

public class NoAccessException : UnauthorizedException
{
    public NoAccessException() : base("Sem acesso a este recurso") { }
}