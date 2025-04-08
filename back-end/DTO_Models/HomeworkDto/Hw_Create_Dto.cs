
namespace Educational.Entities
{
    public class Hw_Create_Dto
    {
        public required string Name { get; set; }

        public required int Degree { get; set; }


        public required ICollection<Question_Create_Dto> Questions { get; set; }
    }
}
