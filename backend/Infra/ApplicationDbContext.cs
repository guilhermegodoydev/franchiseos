using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Infra;

public class ApplicationDbContext: DbContext {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
    {
    }

    public DbSet<MainOffice> MainOffices { get; set; }
    public DbSet<Unit> Units { get; set; }
    public DbSet<MonthlyRevenue> MonthlyRevenues { get; set; }
    public DbSet<User> Users { get; set; }

    public DbSet<Royalty> Royalties { get; set; }
    public DbSet<Payment> Payments => Set<Payment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<MainOffice>(entity => {
            entity.HasKey(m => m.Id);

            entity.Property(m => m.Name).IsRequired().HasMaxLength(150);
            entity.Property(m => m.Cnpj).IsRequired().HasMaxLength(14);
        });

        modelBuilder.Entity<Unit>(entity => {
            entity.HasKey(u => u.Id);

            entity.Property(u => u.Name).IsRequired().HasMaxLength(150);
            entity.Property(u => u.Status).IsRequired().HasConversion<string>().HasMaxLength(20);
            entity.Property(u => u.Size).IsRequired().HasConversion<string>().HasMaxLength(20);
            entity.Property(u => u.Type).IsRequired().HasConversion<string>().HasMaxLength(20);
            entity.Property(u => u.Cep).IsRequired().HasMaxLength(9);
            entity.Property(u => u.Street).IsRequired().HasMaxLength(200);
            entity.Property(u => u.Number).IsRequired().HasMaxLength(20);
            entity.Property(u => u.Neighborhood).IsRequired().HasMaxLength(100);
            entity.Property(u => u.City).IsRequired().HasMaxLength(100);
            entity.Property(u => u.State).IsRequired().HasMaxLength(2);
            entity.Property(u => u.RoyaltiesPercentage).HasColumnType("decimal(5,2)");

            entity.HasOne(u => u.MainOffice).WithMany(m => m.Units).HasForeignKey(u => u.MainOfficeId).OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<MonthlyRevenue>(m => {
            m.HasKey(m => m.Id);

            m.Property(u => u.Revenue).IsRequired();
            m.Property(u => u.Month).IsRequired();
            m.Property(u => u.Year).IsRequired();
            m.Property(u => u.CreatedAt).IsRequired();

            m.HasOne(u => u.Unit).WithMany(m => m.MonthlyRevenues).HasForeignKey(u => u.UnitId).OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<User>(entity => {
            entity.HasKey(u => u.Id);
            entity.Property(u => u.Email).IsRequired().HasMaxLength(200);
            entity.HasIndex(u => u.Email).IsUnique();
            entity.Property(u => u.PasswordHash).IsRequired();
            entity.Property(u => u.Role).IsRequired().HasConversion<string>().HasMaxLength(20);
            entity.HasOne(u => u.MainOffice).WithMany().HasForeignKey(u => u.MainOfficeId).OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Royalty>(entity => {
            entity.HasKey(r => r.Id);

            entity.Property(r => r.Amount).IsRequired().HasColumnType("decimal(12,2)");
            entity.Property(r => r.Percentage).IsRequired();
            entity.Property(r => r.ReferenceMonth).IsRequired();
            entity.Property(r => r.ReferenceYear).IsRequired();
            entity.Property(r => r.DueDate).IsRequired();
            entity.Property(r => r.Status).IsRequired().HasConversion<string>().HasMaxLength(20);

            entity.HasIndex(r => new { r.UnitId, r.ReferenceYear, r.ReferenceMonth }).IsUnique();

            entity.HasOne(r => r.Unit).WithMany(u => u.Royalties).HasForeignKey(r => r.UnitId).OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Payment>(e =>
        {
            e.HasKey(p => p.Id);
            e.Property(p => p.Amount).HasPrecision(18, 2);
        });
    }
}