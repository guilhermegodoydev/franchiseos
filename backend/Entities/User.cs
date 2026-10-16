namespace backend.Entities;

public class User
{
    public Guid Id { get; private set; }
    public string Email { get; private set; } = string.Empty;
    public string PasswordHash { get; private set; } = string.Empty;
    public UserRole Role { get; private set; }
    public Guid? MainOfficeId { get; private set; }
    public MainOffice? MainOffice { get; private set; }

    private User() { }

    public User(string email, string passwordHash, UserRole role, Guid? mainOfficeId = null)
    {
        if (string.IsNullOrWhiteSpace(email)) throw new ArgumentException("Erro: E-mail é obrigatório.");
        if (string.IsNullOrWhiteSpace(passwordHash)) throw new ArgumentException("Erro: Senha é obrigatória.");
        if (!Enum.IsDefined(role)) throw new ArgumentException("Erro: Papel de usuário inválido.");

        Id = Guid.CreateVersion7();
        Email = email.ToLowerInvariant();
        PasswordHash = passwordHash;
        Role = role;
        MainOfficeId = mainOfficeId;
    }

    public bool VerifyPassword(string plainPassword) => BCrypt.Net.BCrypt.Verify(plainPassword, PasswordHash);
}