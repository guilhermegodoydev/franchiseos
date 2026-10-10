using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public record LoginDto(
    [Required, EmailAddress] string Email, 
    [Required] string Password
);

public record LoginResultDto(
    string Token, 
    string Email, 
    string Role
);