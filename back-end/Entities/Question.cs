namespace Educational.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public required string QuestionText { get; set; }

        public int HomeworkId { get; set; }
        public Homework? Homework { get; set; }

        public required List<Option> Options { get; set; } = new List<Option>();

        public ICollection<User_Answer> Users_Answers { get; set; }
    }
}
