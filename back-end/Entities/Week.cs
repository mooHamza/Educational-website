namespace Educational.Entities
{
    public class Week
    {
        public int Id { get; set; }
        public required int WeekNumber { get; set; }
        public required string Content { get; set; }
        public ICollection<Lecture>? Lectures { get; set; }
        public int CourseId { get; set; }
        public Course? Course { get; set; }


    }
}
