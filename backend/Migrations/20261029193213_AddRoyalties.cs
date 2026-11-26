using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddRoyalties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Royalties",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(12,2)", nullable: false),
                    Percentage = table.Column<decimal>(type: "numeric", nullable: false),
                    ReferenceMonth = table.Column<int>(type: "integer", nullable: false),
                    ReferenceYear = table.Column<int>(type: "integer", nullable: false),
                    PayDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    DueDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    UnitId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Royalties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Royalties_Units_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Royalties_UnitId_ReferenceYear_ReferenceMonth",
                table: "Royalties",
                columns: new[] { "UnitId", "ReferenceYear", "ReferenceMonth" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Royalties");
        }
    }
}
