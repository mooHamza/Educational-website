
namespace Educational.Entities
{
    public class Lecture
    {
        public int Id { get; set; }
        public  string Name { get; set; }

        public  string Url { get; set; }

        public  int WeekId { get; set; }
        public Week? Week { get; set; }

        public ICollection<Homework>? Homeworks { get; set; }
    }
}