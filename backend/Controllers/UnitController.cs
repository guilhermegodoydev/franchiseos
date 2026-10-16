using backend.Dtos;
using backend.Entities;
using backend.Extensions;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Authorize]
[ApiController]
[Route("api/units")]
public class UnitController : ControllerBase {
    private readonly UnitService _service;

    public UnitController(UnitService service) {
        this._service = service;
    }

    [Authorize(Roles = nameof(UserRole.Owner))]
    [HttpPost]
    public async Task<IActionResult> CreateUnit([FromBody] CreateUnitDto dto) {

        var mainOfficeId = User.GetMainOfficeId();

        var result = await _service.CreateUnitAsync(mainOfficeId, dto);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<UpdateUnitDto>> GetUnitById([FromRoute] Guid id)
    {
        var mainOfficeId = User.GetMainOfficeId();
        var result = await _service.GetUnitByIdAsync(id, mainOfficeId);
        return Ok(result);
    }

    [Authorize(Roles =nameof(UserRole.Owner))]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateUnit([FromRoute] Guid id, [FromBody] UpdateUnitDto dto)
    {
        var mainofficeId = User.GetMainOfficeId();
        await _service.UpdateUnitAsync(id, mainofficeId, dto);
        return NoContent();
    }

    [Authorize(Roles = nameof(UserRole.Owner))]
    [HttpPatch("{id:guid}/deactivate")]
    public async Task<IActionResult> DeactivateUnit([FromRoute] Guid id)
    {
        var mainOfficeId = User.GetMainOfficeId();

        await _service.DeactivateUnitAsync(id, mainOfficeId);
        return NoContent();
    }
}