namespace Educational.Entities
{
    public class Homework
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public  int LectureId { get; set; }
        public Lecture? Lecture { get; set; }
        public int Degree { get; set; }

        public  ICollection<Question>? Questions { get; set; }
        public ICollection<Users_homeworks>? Users_homeworks { get; set; } = new List<Users_homeworks>();
        public ICollection<User_Answer>? Users_Answers { get; set; } = new List<User_Answer>();

    }
}
