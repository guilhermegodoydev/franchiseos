using System.ComponentModel.DataAnnotations;
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
        [FromQuery] TypeEnum? type,
        [FromQuery] string? state, 
        [FromQuery] string? city,
        [FromQuery] string? searchName,
        [FromQuery, Required] int? month,
        [FromQuery, Required] int? year,
        [FromQuery] int page = 1,
        [FromQuery] int itemsPerPage = 20
    ) {
        var result = await _service.GetUnitsOfficeAsync(mainofficeId, type, page, itemsPerPage, status, size, state, city, searchName, month.Value, year.Value);
        return Ok(result);
    }

    [HttpGet("states/{mainofficeId:guid}")]
    public async Task<ActionResult<List<string>>> GetStates([FromRoute] Guid mainofficeId, [FromQuery] TypeEnum? type) {
        var result = await _service.GetStatesAsync(mainofficeId, type);
        return result;
    }

    [HttpGet("cities/{mainofficeId:guid}")]
    public async Task<ActionResult<List<string>>> GetCities([FromRoute] Guid mainofficeId, [FromQuery] string state, [FromQuery] TypeEnum? type) {
        var result = await _service.GetCitiesInStateAsync(mainofficeId, state, type);
        return result;
    }

    //Fazer endpoint de metricas de units para alimentar os cards
}