using FranchiseOS.Application.Services;
using FranchiseOS.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FranchiseOS.API.Controllers;

[ApiController]
[Route("api/revenues")]
public class MonthlyRevenueController : ControllerBase
{
    private readonly MonthlyRevenueService _service;

    public MonthlyRevenueController(MonthlyRevenueService service)
    {
        _service = service;
    }

    [HttpGet("{unitId:guid}")]
    public async Task<IActionResult> GetAllByUnitAsync(Guid unitId)
    {
        var revenues = await _service.GetAllByUnitAsync(unitId);
        return Ok(revenues);
    }

    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] MonthlyRevenue mr)
    {
        if (mr == null)
            return BadRequest(new { message = "Dados do faturamento inválidos." });

        await _service.AddAsync(mr);
        
        return StatusCode(201, new { message = "Faturamento declarado com sucesso." });
    }
}