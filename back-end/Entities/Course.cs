namespace Educational.Entities
{
    public class Course
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required int Price { get; set; }
        public int GradeId { get; set; }
        public Grade? Grade { get; set; }
        public ICollection<User>? Users { get; set; } = new List<User>();
        public ICollection<Week>? Weeks { get; set; } = new List<Week>();

    }
}
