using Educational.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Educational.Configuraions
{
    public class User_AnswerConfig : IEntityTypeConfiguration<User_Answer>
    {
        public void Configure(EntityTypeBuilder<User_Answer> builder)
        {
            builder.HasKey(x => new { x.UserId, x.QuestionId, x.OptionID });

            builder.HasOne(uA => uA.User)
                .WithMany(u => u.Users_Answers)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.NoAction);


            builder.HasOne(uA => uA.Question)
                .WithMany(u => u.Users_Answers)
                .HasForeignKey(u => u.QuestionId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(uA => uA.Option)
                .WithMany(u => u.Users_Answers)
                .HasForeignKey(u => u.OptionID)
                .OnDelete(DeleteBehavior.NoAction);


            builder.HasOne(uA => uA.Homework)
                .WithMany(u => u.Users_Answers)
                .HasForeignKey(u => u.HomeworkId)
                .OnDelete(DeleteBehavior.NoAction);


        }
    }
}
