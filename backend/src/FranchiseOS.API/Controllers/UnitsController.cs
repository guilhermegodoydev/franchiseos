using FranchiseOS.Application.Services;
using FranchiseOS.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FranchiseOS.API.Controllers;

[ApiController]
[Route("api/units")]
public class UnitsController : ControllerBase
{
    private readonly UnitService _unitService;

    public UnitsController(UnitService unitService)
    {
        _unitService = unitService;
    }
  
    [HttpGet("office/{mainOfficeId:guid}")]
    public async Task<IActionResult> GetByOffice(Guid mainOfficeId)
    {
        var units = await _unitService.GetUnitsOfficeAsync(mainOfficeId);
        return Ok(units);
    }

    [HttpGet("{id:guid}")] 
    public async Task<IActionResult> GetById(Guid id)
    {
        var unit = await _unitService.GetUnitByIdAsync(id);

        if (unit == null) 
            return NotFound(new { message = "Unidade não encontrada" });

        return Ok(unit);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] Unit updatedUnit)
    {
        if (id != updatedUnit.Id)
            return BadRequest(new { message = "Os IDs não coincidem." });

        var existing = await _unitService.GetUnitByIdAsync(id);
        if (existing == null)
            return NotFound(new { message = "Unidade não encontrada para atualização." });

        await _unitService.UpdateUnitAsync(updatedUnit);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var existing = await _unitService.GetUnitByIdAsync(id);
        if (existing == null)
            return NotFound(new { message = "Unidade não encontrada" });
        
        await _unitService.DeleteUnitAsync(id);
        return NoContent();
    }
}