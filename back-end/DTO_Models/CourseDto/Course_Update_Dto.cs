using Educational.Entities;

namespace Educational.DTO_Models.CourseDto
{
    public class Course_Update_Dto
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required int Price { get; set; }
        public required int GradeId { get; set; }
    }
}
