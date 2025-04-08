using Educational.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Educational.Configuraions
{
    public class HomeworkeConfig : IEntityTypeConfiguration<Homework>
    {
        public void Configure(EntityTypeBuilder<Homework> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Id)
                .ValueGeneratedOnAdd();


            builder.HasOne(h => h.Lecture)
                .WithMany(l => l.Homeworks)
                .HasForeignKey(h => h.LectureId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
