using System.Security.Claims;
using backend.Exceptions;

namespace backend.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static Guid GetMainOfficeId(this ClaimsPrincipal user) =>
        Guid.TryParse(user.FindFirstValue("main_office_id"), out var id)
            ? id
            : throw new NoAccessException();
}