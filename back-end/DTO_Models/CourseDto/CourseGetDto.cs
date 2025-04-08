using Educational.Entities;

namespace Educational.DTO_Models.CourseDto
{
    public class CourseGetDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required int Price { get; set; }
        public required string GradeName { get; set; }
        public ICollection<Week_Get_Dto>? Weeks { get; set; }
    }
}
