using System;
using System.Collections.Generic;
using Educational.Configuraions;
using Educational.Entities;
using Microsoft.EntityFrameworkCore;

namespace Educational.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Grade> Grades { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Course> Courses { get; set; }
    public virtual DbSet<Week> Weeks { get; set; }
    public virtual DbSet<Lecture> Lectures { get; set; }
    public virtual DbSet<Homework> Homeworks { get; set; }
    public virtual DbSet<Question> Questions { get; set; }
    public virtual DbSet<Option> Options { get; set; }
    public virtual DbSet<Users_homeworks> Users_homeworks { get; set; }
    public virtual DbSet<User_Answer> Users_Answers { get; set; }




    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Grade>(entity =>
        {
            entity.ToTable("Grade");

            entity.Property(e => e.GradeName).HasColumnName("gradeName");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Roles__3214EC0728BB4F7C");

            entity.Property(e => e.RoleName).HasColumnName("roleName");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.GradeId, "IX_Users_GradeId");

            entity.Property(e => e.City).HasColumnName("city");
            entity.Property(e => e.FirstName).HasColumnName("firstName");
            entity.Property(e => e.Phone).HasColumnName("phone");
            entity.Property(e => e.SecendName).HasColumnName("secendName");

            entity.HasOne(d => d.Grade).WithMany(p => p.Users).HasForeignKey(d => d.GradeId);

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UsersRole",
                    r => r.HasOne<Role>().WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("role_fk"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("User_fk"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId").HasName("_PK_UserRoles");
                        j.ToTable("Users_roles");
                        j.IndexerProperty<int>("UserId").HasColumnName("userId");
                        j.IndexerProperty<int>("RoleId").HasColumnName("roleId");
                    });
        });

        modelBuilder.ApplyConfiguration(new Users_homeworksConfig());
        modelBuilder.ApplyConfiguration(new User_AnswerConfig());


        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
