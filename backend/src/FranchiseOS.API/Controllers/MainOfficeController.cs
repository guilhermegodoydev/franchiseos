using FranchiseOS.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace FranchiseOS.API.Controllers;

[ApiController]
[Route("api/mainoffices")]
public class MainOfficeController : ControllerBase
{
    private readonly MainOfficeService _service;

    public MainOfficeController(MainOfficeService service)
    {
        _service = service;
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var office = await _service.GetByIdAsync(id);

        if (office == null)
            return NotFound(new { message = "Escritório central não encontrado"});
        
        return Ok(office);
    }
}