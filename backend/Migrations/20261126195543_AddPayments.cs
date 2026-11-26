using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddPayments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CancelReason",
                table: "Royalties",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CancelledAt",
                table: "Royalties",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PaymentId",
                table: "Royalties",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    PayMethod = table.Column<int>(type: "integer", nullable: false),
                    PayDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Royalties_PaymentId",
                table: "Royalties",
                column: "PaymentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Royalties_Payments_PaymentId",
                table: "Royalties",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Royalties_Payments_PaymentId",
                table: "Royalties");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Royalties_PaymentId",
                table: "Royalties");

            migrationBuilder.DropColumn(
                name: "CancelReason",
                table: "Royalties");

            migrationBuilder.DropColumn(
                name: "CancelledAt",
                table: "Royalties");

            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "Royalties");
        }
    }
}
