using FranchiseOS.Application.Services;
using FranchiseOS.Domain.Entities;
using FranchiseOS.Domain.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace FranchiseOS.API.Controllers;

[ApiController]
[Route("api/supplyorders")]
public class SupplyOrderController : ControllerBase
{
    private readonly SupplyOrderService _service;

    public SupplyOrderController(SupplyOrderService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] SupplyOrder supplyOrder)
    {
        try
        {
            await _service.AddAsync(supplyOrder);

            return Created(string.Empty, null);
        }
        catch (DomainException ex)
        {
            return StatusCode(403, new { error = ex.Message });
        }
    }
}