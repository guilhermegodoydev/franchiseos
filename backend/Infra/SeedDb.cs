using backend.Entities;
using Bogus;
using Microsoft.EntityFrameworkCore;

namespace backend.Infra;

public static class SeedDb {
    public static void Seed(ApplicationDbContext context) {
        context.Database.Migrate();

        if (context.Units.Any()) {
            return;
        }

        string[] neighbors = ["Centro", "Jardins", "Vila Mariana", "Botafogo", "Copacabana", "Boa Viagem", "Meireles", "Savassi"]; 

        Guid mainOfficeId = Guid.Parse("8c383fc5-32b5-4d69-9a29-92057b532163");
        var mainOffice = new MainOffice(
            mainOfficeId,
            "77143715000128",
            "Pão de Açucar",
            false
        );

        var unitFaker = new Faker<Unit>("pt_BR")
            .CustomInstantiator(f => new Unit(
                name: f.Company.CompanyName(),
                status: f.PickRandom<StatusEnum>(),
                size: f.PickRandom<SizeEnum>(),
                type: f.PickRandom<TypeEnum>(),
                cep: f.Address.ZipCode("#####-###"), 
                street: f.Address.StreetName(),
                number: f.Address.BuildingNumber(),
                neighborhood: f.PickRandom(neighbors),
                city: f.Address.City(),
                state: f.Address.StateAbbr(),
                mainOfficeId: mainOfficeId
            ))
            .RuleFor(u => u.Revenue, f => Math.Round(f.Random.Double(10000, 500000), 2));


        List<Unit> fakeUnits = unitFaker.Generate(50);

        context.MainOffices.Add(mainOffice);
        context.Units.AddRange(fakeUnits);
        context.SaveChanges();
    }
}