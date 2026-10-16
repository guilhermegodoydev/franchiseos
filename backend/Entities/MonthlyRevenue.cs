using Microsoft.AspNetCore.Components.Server;

namespace backend.Entities;

public class MonthlyRevenue {
    public Guid Id { get; private set; }
    public decimal Revenue { get; private set; }
    public int Month { get; private set; }
    public int Year { get; private set; }
    public DateTimeOffset CreatedAt { get; init; } = DateTimeOffset.UtcNow;

    public Guid UnitId { get; private set; }
    public Unit Unit { get; private set; } = null!;

    private MonthlyRevenue() { }

    public MonthlyRevenue(Guid unitId, decimal revenue, int month, int year) {
        int currentYear = DateTimeOffset.UtcNow.Year;

        if (unitId == Guid.Empty) throw new ArgumentException("O código da unidade não pode ser vazio");
        if (revenue < 0) throw new ArgumentException("O faturamento não pode ser negativo");
        if (month < 1 || month > 12) throw new ArgumentOutOfRangeException(nameof(month), "Mês precisa estar entre 1 e 12");
        if (year > currentYear) throw new ArgumentOutOfRangeException(nameof(year), "O ano não pode ser maior que o ano atual");

        this.Id = Guid.CreateVersion7();
        this.Revenue = revenue;
        this.Month = month;
        this.Year = year;
        this.UnitId = unitId;
    }

    public void SetUnitId(Guid id) {
        this.UnitId = id;
    }
}