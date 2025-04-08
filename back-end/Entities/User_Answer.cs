namespace Educational.Entities
{
    public class User_Answer
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int QuestionId { get; set; }

        public Question Question { get; set; }

        public int OptionID { get; set; }

        public Option Option { get; set; }

        public int HomeworkId { get; set; }

        public Homework Homework { get; set; }

    }
}
