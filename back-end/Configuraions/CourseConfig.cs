using Educational.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Educational.Configuraions
{
    public class CourseConfig : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Id)
                .ValueGeneratedOnAdd();

            builder.HasMany(c => c.Users)
                .WithMany(u => u.Courses)
                .UsingEntity<Dictionary<string, object>>(
                "Users_courses",
                j => j.HasOne<User>().WithMany().OnDelete(DeleteBehavior.Restrict),
                j => j.HasOne<Course>().WithMany().OnDelete(DeleteBehavior.Cascade)
                );



        }
    }
}
