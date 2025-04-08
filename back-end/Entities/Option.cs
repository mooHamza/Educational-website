namespace Educational.Entities
{
    public class Option
    {
        public int Id { get; set; }
        public required string OptionText { get; set; }
        public bool IsCorrect { get; set; } = false;

        public int QuestionId { get; set; }
       public Question? Question { get; set; }

        public ICollection<User_Answer> Users_Answers { get; set; }
    }
}
