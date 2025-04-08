using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Educational.Migrations
{
    /// <inheritdoc />
    public partial class er : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Users_Answers_HomeworkId",
                table: "Users_Answers",
                column: "HomeworkId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Answers_Homeworks_HomeworkId",
                table: "Users_Answers",
                column: "HomeworkId",
                principalTable: "Homeworks",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Answers_Homeworks_HomeworkId",
                table: "Users_Answers");

            migrationBuilder.DropIndex(
                name: "IX_Users_Answers_HomeworkId",
                table: "Users_Answers");
        }
    }
}
