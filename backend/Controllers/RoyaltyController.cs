using backend.Dtos;
using backend.Entities;
using backend.Extensions;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Authorize]
[ApiController]
[Route("api/royalties")]
public class RoyaltyController : ControllerBase
{
    private readonly RoyaltyService _service;

    public RoyaltyController(RoyaltyService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResultRoyaltiesDto>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] StatusRoyaltyEnum? status = null)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var result = await _service.GetRoyaltiesByOfficeAsync(User.GetMainOfficeId(), page, pageSize, status);
        return Ok(result);
    }

    [HttpPost("generate")]
    public async Task<IActionResult> Generate(GenerateRoyaltiesDto dto)
    {
        var created = await _service.GenerateRoyaltiesAsync(User.GetMainOfficeId(), dto.Month, dto.Year);
        return Ok(new { created });
    }

    [HttpPatch("{id:guid}/pay")]
    public async Task<IActionResult> Pay(Guid id, PayRoyaltyDto dto)
    {
        await _service.MarkAsPaidAsync(User.GetMainOfficeId(), id, dto.PayMethod!.Value, dto.PayDate);
        return NoContent();
    }

    [HttpGet("{id:guid}/payment")]
    public async Task<ActionResult<PaymentDto>> GetPayment(Guid id)
    {
        var payment = await _service.GetPaymentAsync(User.GetMainOfficeId(), id);
        return payment is null ? NoContent() : Ok(payment);
    }

    [HttpPatch("{id:guid}/cancel")]
    public async Task<IActionResult> Cancel(Guid id, CancelRoyaltyDto dto)
    {
        await _service.CancelAsync(User.GetMainOfficeId(), id, dto.Reason);
        return NoContent();
    }
}