namespace backend.Exceptions;

public class MainOfficeNotFoundExcepetion : NotFoundException {
    public MainOfficeNotFoundExcepetion(Guid id) : base($"O escritório com o ID '{id}' não foi encontrado.") { }
}