using Educational.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Educational.DTO_Models.CourseDto
{
    public class FullCourse_Create_Dto
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required int Price { get; set; }
        public required int GradeId { get; set; }
        public ICollection<Week_CreateDto>? Weeks { get; set; }
    }
}
