using System;
using System.Collections.Generic;
using System.Reflection.Emit;
using Educational.Configuraions;
using Educational.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Educational.Data;

public partial class AppDbContext : IdentityDbContext<User>
{
    public AppDbContext()
    {
        
    }
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Grade> Grades { get; set; }
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
       base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Grade>(entity =>
        {
            entity.ToTable("Grade");

            entity.Property(e => e.GradeName).HasColumnName("gradeName");
        });

      

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.GradeId, "IX_Users_GradeId");

            entity.Property(e => e.City).HasColumnName("city");
            entity.Property(e => e.FirstName).HasColumnName("firstName");
            entity.Property(e => e.SecendName).HasColumnName("secendName");

            entity.HasOne(d => d.Grade).WithMany(p => p.Users).HasForeignKey(d => d.GradeId);

        
        });

        modelBuilder.ApplyConfiguration(new Users_homeworksConfig());
        modelBuilder.ApplyConfiguration(new User_AnswerConfig());


        OnModelCreatingPartial(modelBuilder);
    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
