using System.Drawing;
using backend.Entities;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace backend.Controllers;

[ApiController]
[Route("api/units")]
public class UnitController : ControllerBase {
    private readonly UnitService _service;

    public UnitController(UnitService service) {
        this._service = service;
    }

    [HttpGet("office/{mainofficeId:guid}")]
    public async Task<IActionResult> GetUnitsOffice(
        [FromRoute] Guid mainofficeId, 
        [FromQuery] StatusEnum? status, 
        [FromQuery] SizeEnum? size, 
        [FromQuery] string? state, 
        [FromQuery] string? city,
        [FromQuery] string? searchName,
        [FromQuery] int currentPage = 1,
        [FromQuery] int itemsPerPage = 20
    ) {
        var result = await _service.GetUnitsOfficeAsync(mainofficeId, currentPage, itemsPerPage, status, size, state, city, searchName);
        return Ok(result);
    }
}