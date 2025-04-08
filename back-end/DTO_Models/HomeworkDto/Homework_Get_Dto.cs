

namespace Educational.Entities
{
    public class Homework_Get_Dto
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public int Degree { get; set; }

        public required ICollection<Question_Get_Dto> Questions { get; set; }
    }
}
