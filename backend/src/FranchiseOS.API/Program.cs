using FranchiseOS.Application.Services;
using FranchiseOS.Domain.Interfaces;
using FranchiseOS.Infrastructure;
using FranchiseOS.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options => 
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)).UseSnakeCaseNamingConvention()
);

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IMainOfficeRepository, MainOfficeRepository>();
builder.Services.AddScoped<IUnitRepository, UnitRepository>();
builder.Services.AddScoped<IMonthlyRevenueRepository, MonthlyRevenueRepository>();
builder.Services.AddScoped<ISupplyOrderRepository, SupplyOrderRepository>();
builder.Services.AddScoped<IRoyaltyBillingRepository, RoyaltyBillingRepository>();

builder.Services.AddScoped<IBatchExecutionRepository, BatchExecutionRepository>();
builder.Services.AddScoped<IUnitOfWork>(provider => provider.GetRequiredService<ApplicationDbContext>());

builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<MainOfficeService>();
builder.Services.AddScoped<UnitService>();
builder.Services.AddScoped<MonthlyRevenueService>();
builder.Services.AddScoped<SupplyOrderService>();

builder.Services.AddScoped<BatchExecutionService>();

builder.Services.AddControllers();
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.MapControllers();   
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

//app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
