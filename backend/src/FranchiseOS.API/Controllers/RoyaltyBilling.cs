using FranchiseOS.Application.Services;
using FranchiseOS.Domain.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace FranchiseOS.API.Controllers;

[ApiController]
[Route("api/royalties")]
public class RoyaltyBillingController : ControllerBase
{
    private readonly BatchExecutionService _service;

    public RoyaltyBillingController(BatchExecutionService service)
    {
        _service = service;
    }

    public record ProcessBatchRequest(Guid MainOfficeId, int Month, int Year);

    [HttpPost("process-batch")]
    public async Task<IActionResult> ProcessMonthlyBillingAsync([FromBody] ProcessBatchRequest request)
    {
        try
        {
            await _service.ProcessMonthlyBillingAsync(request.MainOfficeId, request.Month, request.Year);
            return Created(string.Empty, null);
        }
        catch (DomainException ex)
        {
            return BadRequest(new { message = ex.Message});
        }
        catch (Exception)
        {
            return StatusCode(500, new { error = "An internal server error occurred."});
        }
    }
}