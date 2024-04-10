using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkersList.Data.Migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Workers_WorkerId",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Roles_WorkerId",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "IsManagerial",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "StartRole",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "WorkerId",
                table: "Roles");

            migrationBuilder.CreateTable(
                name: "RoleForWorker",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    roleId = table.Column<int>(type: "int", nullable: false),
                    IsManagerial = table.Column<bool>(type: "bit", nullable: false),
                    StartRole = table.Column<DateTime>(type: "datetime2", nullable: false),
                    WorkerId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleForWorker", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleForWorker_Roles_roleId",
                        column: x => x.roleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleForWorker_Workers_WorkerId",
                        column: x => x.WorkerId,
                        principalTable: "Workers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoleForWorker_roleId",
                table: "RoleForWorker",
                column: "roleId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleForWorker_WorkerId",
                table: "RoleForWorker",
                column: "WorkerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoleForWorker");

            migrationBuilder.AddColumn<bool>(
                name: "IsManagerial",
                table: "Roles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartRole",
                table: "Roles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "WorkerId",
                table: "Roles",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Roles_WorkerId",
                table: "Roles",
                column: "WorkerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Workers_WorkerId",
                table: "Roles",
                column: "WorkerId",
                principalTable: "Workers",
                principalColumn: "Id");
        }
    }
}
