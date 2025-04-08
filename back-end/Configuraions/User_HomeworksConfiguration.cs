using Educational.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Educational.Configuraions
{
    public class Users_homeworksConfig : IEntityTypeConfiguration<Users_homeworks>
    {
        public void Configure(EntityTypeBuilder<Users_homeworks> builder)
        {
            builder.HasKey(c => new { c.UserId, c.HomeworkId });


            builder.HasOne(uh => uh.User)
              .WithMany(u => u.Users_homeworks)
              .HasForeignKey(uh => uh.UserId)
              .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(uh => uh.Homework)
                .WithMany(h => h.Users_homeworks)
                .HasForeignKey(uh => uh.HomeworkId)
                .OnDelete(DeleteBehavior.NoAction);

        }
    }
}
