using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Infra;

public class ApplicationDbContext: DbContext {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
    {
    }

    public DbSet<MainOffice> MainOffices { get; set; }
    public DbSet<Unit> Units { get; set; }

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
            entity.Property(u => u.Cep).IsRequired().HasMaxLength(9);
            entity.Property(u => u.Street).IsRequired().HasMaxLength(200);
            entity.Property(u => u.Number).IsRequired().HasMaxLength(20);
            entity.Property(u => u.Neighborhood).IsRequired().HasMaxLength(100);
            entity.Property(u => u.City).IsRequired().HasMaxLength(100);
            entity.Property(u => u.State).IsRequired().HasMaxLength(2);

            entity.HasOne(u => u.MainOffice).WithMany(m => m.Units).HasForeignKey(u => u.MainOfficeId).OnDelete(DeleteBehavior.Restrict);
        });
    }
}