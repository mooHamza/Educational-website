using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Educational.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //    migrationBuilder.CreateTable(
            //        name: "Grade",
            //        columns: table => new
            //        {
            //            Id = table.Column<int>(type: "int", nullable: false)
            //                .Annotation("SqlServer:Identity", "1, 1"),
            //            gradeName = table.Column<string>(type: "nvarchar(max)", nullable: false)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK_Grade", x => x.Id);
            //        });

            //    migrationBuilder.CreateTable(
            //        name: "Roles",
            //        columns: table => new
            //        {
            //            Id = table.Column<int>(type: "int", nullable: false)
            //                .Annotation("SqlServer:Identity", "1, 1"),
            //            roleName = table.Column<string>(type: "nvarchar(max)", nullable: false)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK__Roles__3214EC0728BB4F7C", x => x.Id);
            //        });

            //    migrationBuilder.CreateTable(
            //        name: "Courses",
            //        columns: table => new
            //        {
            //            Id = table.Column<int>(type: "int", nullable: false)
            //                .Annotation("SqlServer:Identity", "1, 1"),
            //            Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //            Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //            Price = table.Column<int>(type: "int", nullable: false),
            //            GradeId = table.Column<int>(type: "int", nullable: false)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK_Courses", x => x.Id);
            //            table.ForeignKey(
            //                name: "FK_Courses_Grade_GradeId",
            //                column: x => x.GradeId,
            //                principalTable: "Grade",
            //                principalColumn: "Id",
            //                onDelete: ReferentialAction.Cascade);
            //        });

            //    migrationBuilder.CreateTable(
            //        name: "Users",
            //        columns: table => new
            //        {
            //            Id = table.Column<int>(type: "int", nullable: false)
            //                .Annotation("SqlServer:Identity", "1, 1"),
            //            Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //            Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //            firstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //            secendName = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //            city = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //            phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //            GradeId = table.Column<int>(type: "int", nullable: false)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK_Users", x => x.Id);
            //            table.ForeignKey(
            //                name: "FK_Users_Grade_GradeId",
            //                column: x => x.GradeId,
            //                principalTable: "Grade",
            //                principalColumn: "Id",
            //                onDelete: ReferentialAction.Cascade);
            //        });

            //    migrationBuilder.CreateTable(
            //        name: "Weeks",
            //        columns: table => new
            //        {
            //            Id = table.Column<int>(type: "int", nullable: false)
            //                .Annotation("SqlServer:Identity", "1, 1"),
            //            WeekNumber = table.Column<int>(type: "int", nullable: false),
            //            Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //            CourseId = table.Column<int>(type: "int", nullable: false)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK_Weeks", x => x.Id);
            //            table.ForeignKey(
            //                name: "FK_Weeks_Courses_CourseId",
            //                column: x => x.CourseId,
            //                principalTable: "Courses",
            //                principalColumn: "Id",
            //                onDelete: ReferentialAction.Cascade);
            //        });

            //    migrationBuilder.CreateTable(
            //        name: "CourseUser",
            //        columns: table => new
            //        {
            //            CoursesId = table.Column<int>(type: "int", nullable: false),
            //            UsersId = table.Column<int>(type: "int", nullable: false)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK_CourseUser", x => new { x.CoursesId, x.UsersId });
            //            table.ForeignKey(
            //                name: "FK_CourseUser_Courses_CoursesId",
            //                column: x => x.CoursesId,
            //                principalTable: "Courses",
            //                principalColumn: "Id",
            //                onDelete: ReferentialAction.Cascade);
            //            table.ForeignKey(
            //                name: "FK_CourseUser_Users_UsersId",
            //                column: x => x.UsersId,
            //                principalTable: "Users",
            //                principalColumn: "Id",
            //                onDelete: ReferentialAction.Cascade);
            //        });

            //    migrationBuilder.CreateTable(
            //        name: "Users_roles",
            //        columns: table => new
            //        {
            //            userId = table.Column<int>(type: "int", nullable: false),
            //            roleId = table.Column<int>(type: "int", nullable: false)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("_PK_UserRoles", x => new { x.userId, x.roleId });
            //            table.ForeignKey(
            //                name: "User_fk",
            //                column: x => x.userId,
            //                principalTable: "Users",
            //                principalColumn: "Id");
            //            table.ForeignKey(
            //                name: "role_fk",
            //                column: x => x.roleId,
            //                principalTable: "Roles",
            //                principalColumn: "Id");
            //        });

            //    migrationBuilder.CreateTable(
            //        name: "Lectures",
            //        columns: table => new
            //        {
            //            Id = table.Column<int>(type: "int", nullable: false)
            //                .Annotation("SqlServer:Identity", "1, 1"),
            //            Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //            Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //            WeekId = table.Column<int>(type: "int", nullable: false)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK_Lectures", x => x.Id);
            //            table.ForeignKey(
            //                name: "FK_Lectures_Weeks_WeekId",
            //                column: x => x.WeekId,
            //                principalTable: "Weeks",
            //                principalColumn: "Id",
            //                onDelete: ReferentialAction.Cascade);
            //        });

            //    migrationBuilder.CreateTable(
            //        name: "Homeworks",
            //        columns: table => new
            //        {
            //            Id = table.Column<int>(type: "int", nullable: false)
            //                .Annotation("SqlServer:Identity", "1, 1"),
            //            Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //            LectureId = table.Column<int>(type: "int", nullable: false),
            //            score = table.Column<int>(type: "int", nullable: false)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK_Homeworks", x => x.Id);
            //            table.ForeignKey(
            //                name: "FK_Homeworks_Lectures_LectureId",
            //                column: x => x.LectureId,
            //                principalTable: "Lectures",
            //                principalColumn: "Id",
            //                onDelete: ReferentialAction.Cascade);
            //        });

            //    migrationBuilder.CreateTable(
            //        name: "Questions",
            //        columns: table => new
            //        {
            //            Id = table.Column<int>(type: "int", nullable: false)
            //                .Annotation("SqlServer:Identity", "1, 1"),
            //            QuestionText = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //            HomeworkId = table.Column<int>(type: "int", nullable: false)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK_Questions", x => x.Id);
            //            table.ForeignKey(
            //                name: "FK_Questions_Homeworks_HomeworkId",
            //                column: x => x.HomeworkId,
            //                principalTable: "Homeworks",
            //                principalColumn: "Id",
            //                onDelete: ReferentialAction.Cascade);
            //        });

            //    migrationBuilder.CreateTable(
            //        name: "Users_homeworks",
            //        columns: table => new
            //        {
            //            UserId = table.Column<int>(type: "int", nullable: false),
            //            HomeworkId = table.Column<int>(type: "int", nullable: false),
            //            Score = table.Column<int>(type: "int", nullable: false)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK_Users_homeworks", x => new { x.UserId, x.HomeworkId });
            //            table.ForeignKey(
            //                name: "FK_Users_homeworks_Homeworks_HomeworkId",
            //                column: x => x.HomeworkId,
            //                principalTable: "Homeworks",
            //                principalColumn: "Id");
            //            table.ForeignKey(
            //                name: "FK_Users_homeworks_Users_UserId",
            //                column: x => x.UserId,
            //                principalTable: "Users",
            //                principalColumn: "Id");
            //        });

            //    migrationBuilder.CreateTable(
            //        name: "Options",
            //        columns: table => new
            //        {
            //            Id = table.Column<int>(type: "int", nullable: false)
            //                .Annotation("SqlServer:Identity", "1, 1"),
            //            OptionText = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //            IsCorrect = table.Column<bool>(type: "bit", nullable: false),
            //            QuestionId = table.Column<int>(type: "int", nullable: false)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK_Options", x => x.Id);
            //            table.ForeignKey(
            //                name: "FK_Options_Questions_QuestionId",
            //                column: x => x.QuestionId,
            //                principalTable: "Questions",
            //                principalColumn: "Id",
            //                onDelete: ReferentialAction.Cascade);
            //        });

            //    migrationBuilder.CreateTable(
            //        name: "Users_Answers",
            //        columns: table => new
            //        {
            //            UserId = table.Column<int>(type: "int", nullable: false),
            //            QuestionId = table.Column<int>(type: "int", nullable: false),
            //            OptionID = table.Column<int>(type: "int", nullable: false)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK_Users_Answers", x => new { x.UserId, x.QuestionId, x.OptionID });
            //            table.ForeignKey(
            //                name: "FK_Users_Answers_Options_OptionID",
            //                column: x => x.OptionID,
            //                principalTable: "Options",
            //                principalColumn: "Id");
            //            table.ForeignKey(
            //                name: "FK_Users_Answers_Questions_QuestionId",
            //                column: x => x.QuestionId,
            //                principalTable: "Questions",
            //                principalColumn: "Id");
            //            table.ForeignKey(
            //                name: "FK_Users_Answers_Users_UserId",
            //                column: x => x.UserId,
            //                principalTable: "Users",
            //                principalColumn: "Id");
            //        });

            //    migrationBuilder.CreateIndex(
            //        name: "IX_Courses_GradeId",
            //        table: "Courses",
            //        column: "GradeId");

            //    migrationBuilder.CreateIndex(
            //        name: "IX_CourseUser_UsersId",
            //        table: "CourseUser",
            //        column: "UsersId");

            //    migrationBuilder.CreateIndex(
            //        name: "IX_Homeworks_LectureId",
            //        table: "Homeworks",
            //        column: "LectureId");

            //    migrationBuilder.CreateIndex(
            //        name: "IX_Lectures_WeekId",
            //        table: "Lectures",
            //        column: "WeekId");

            //    migrationBuilder.CreateIndex(
            //        name: "IX_Options_QuestionId",
            //        table: "Options",
            //        column: "QuestionId");

            //    migrationBuilder.CreateIndex(
            //        name: "IX_Questions_HomeworkId",
            //        table: "Questions",
            //        column: "HomeworkId");

            //    migrationBuilder.CreateIndex(
            //        name: "IX_Users_GradeId",
            //        table: "Users",
            //        column: "GradeId");

            //    migrationBuilder.CreateIndex(
            //        name: "IX_Users_Answers_OptionID",
            //        table: "Users_Answers",
            //        column: "OptionID");

            //    migrationBuilder.CreateIndex(
            //        name: "IX_Users_Answers_QuestionId",
            //        table: "Users_Answers",
            //        column: "QuestionId");

            //    migrationBuilder.CreateIndex(
            //        name: "IX_Users_homeworks_HomeworkId",
            //        table: "Users_homeworks",
            //        column: "HomeworkId");

            //    migrationBuilder.CreateIndex(
            //        name: "IX_Users_roles_roleId",
            //        table: "Users_roles",
            //        column: "roleId");

            //    migrationBuilder.CreateIndex(
            //        name: "IX_Weeks_CourseId",
            //        table: "Weeks",
            //        column: "CourseId");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropTable(
            //    name: "CourseUser");

            //migrationBuilder.DropTable(
            //    name: "Users_Answers");

            //migrationBuilder.DropTable(
            //    name: "Users_homeworks");

            //migrationBuilder.DropTable(
            //    name: "Users_roles");

            //migrationBuilder.DropTable(
            //    name: "Options");

            //migrationBuilder.DropTable(
            //    name: "Users");

            //migrationBuilder.DropTable(
            //    name: "Roles");

            //migrationBuilder.DropTable(
            //    name: "Questions");

            //migrationBuilder.DropTable(
            //    name: "Homeworks");

            //migrationBuilder.DropTable(
            //    name: "Lectures");

            //migrationBuilder.DropTable(
            //    name: "Weeks");

            //migrationBuilder.DropTable(
            //    name: "Courses");

            //migrationBuilder.DropTable(
            //    name: "Grade");
        }

    }
}