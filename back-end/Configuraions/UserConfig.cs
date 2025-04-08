using Educational.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Educational.Configuraions
{
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Id)
                .ValueGeneratedOnAdd();


            builder.HasMany(u => u.Roles)
                .WithMany(r => r.Users);
                 


            builder.HasOne(u => u.Grade)
                 .WithMany(g => g.Users)
                 .HasForeignKey(u => u.GradeId)
                 .OnDelete(DeleteBehavior.SetNull);

        }
    }
}
