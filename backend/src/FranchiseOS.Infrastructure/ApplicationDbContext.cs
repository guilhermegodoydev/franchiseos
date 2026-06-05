using Microsoft.EntityFrameworkCore;
using FranchiseOS.Domain.Entities;
using FranchiseOS.Domain.Interfaces;

namespace FranchiseOS.Infrastructure;

public class ApplicationDbContext : DbContext, IUnitOfWork
{   
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<MainOffice> MainOffices { get; set; }
    public DbSet<Unit> Units { get; set; }
    public DbSet<MonthlyRevenue> MonthlyRevenues { get; set; }
    public DbSet<RoyaltyBilling> RoyaltyBillings { get; set; }
    public DbSet<BatchExecution> BatchExecutions { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<SupplyOrder> SupplyOrders { get; set; }
    public DbSet<SupplyOrderItem> SupplyOrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<SupplyOrderItem>(entity =>
        {
            entity.HasKey(e => new { e.SupplyOrderId, e.ProductId });
        });
    }

    public async Task CommitAsync()
    {
        await base.SaveChangesAsync();
    }
}