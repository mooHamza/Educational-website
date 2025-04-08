using Educational.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Educational.Configuraions
{
    public class LectureConfig : IEntityTypeConfiguration<Lecture>
    {
        public void Configure(EntityTypeBuilder<Lecture> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Id)
                .ValueGeneratedOnAdd();


            builder.HasOne(l => l.Week)
                .WithMany(w => w.Lectures)
                .HasForeignKey(l => l.WeekId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
