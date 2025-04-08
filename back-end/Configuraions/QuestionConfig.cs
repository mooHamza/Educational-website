using Educational.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Educational.Configuraions
{
    public class QuestionConfig : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Id)
                .ValueGeneratedOnAdd();


            builder.HasOne(q => q.Homework)
                .WithMany(h => h.Questions)
                .HasForeignKey(q => q.HomeworkId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
