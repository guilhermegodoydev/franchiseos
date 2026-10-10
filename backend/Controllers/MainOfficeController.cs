using System.ComponentModel.DataAnnotations;
using backend.Dtos;
using backend.Entities;
using backend.Extensions;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Authorize(Roles = nameof(UserRole.Owner))]
[ApiController]
[Route("api/offices")]
public class MainOfficeController : ControllerBase
{
    private readonly UnitService _unitService;
    
    public MainOfficeController(UnitService unitService)
    {
        _unitService = unitService;
    }

    [HttpGet("states")]
    public async Task<ActionResult<List<string>>> GetStates([FromQuery] TypeEnum? type) {
        var mainofficeId = User.GetMainOfficeId();
        var result = await _unitService.GetStatesAsync(mainofficeId, type);
        return result;
    }

    [HttpGet("cities")]
    public async Task<ActionResult<List<string>>> GetCities([FromQuery] string state, [FromQuery] TypeEnum? type) {
        var mainofficeId = User.GetMainOfficeId();
        var result = await _unitService.GetCitiesInStateAsync(mainofficeId, state, type);
        return result;
    }

    [HttpGet("metrics")]
    public async Task<ActionResult<MetricsUnitsDto>> GetUnitsMetrics() {

        // TODO: Implementar lógica real de BI na Fase 3 após concluir os CRUDs de faturamento e royalties.
        // TODO: Calcular métricas líquidas (Lojas Próprias [Bruto] + Franquias [Apenas Royalties]) usando dados do mês anterior consolidado.
        // TODO: Implementar lógica de BI na Fase 3 após concluir os CRUDs de faturamento e royalties.

        // Lógica futura: Unidades Próprias (Faturamento Bruto) + Franquias (Apenas Royalties).
        
        var mockMetrics = new MetricsUnitsDto(
            MostRevenue: new MostRevenueInMonth(
                Name: "Unidade Própria Paulista", 
                Revenue: 52000.00m
            ),
            Decrease: -4.2m,
            Health: "Estável"
        );
        
        return Ok(mockMetrics);
    }

    [HttpGet("units")]
    public async Task<IActionResult> GetUnitsOffice(
        [FromQuery] StatusEnum? status, 
        [FromQuery] SizeEnum? size, 
        [FromQuery] TypeEnum? type,
        [FromQuery] string? state, 
        [FromQuery] string? city,
        [FromQuery] string? searchName,
        [FromQuery, Required] int? month,
        [FromQuery, Required] int? year,
        [FromQuery, Range(1, int.MaxValue)] int page = 1,
        [FromQuery, Range(1, 100)] int itemsPerPage = 20
    ) {
        var mainofficeId = User.GetMainOfficeId();
        var result = await _unitService.GetUnitsOfficeAsync(mainofficeId, type, page, itemsPerPage, status, size, state, city, searchName, month.Value, year.Value);
        return Ok(result);
    }
}