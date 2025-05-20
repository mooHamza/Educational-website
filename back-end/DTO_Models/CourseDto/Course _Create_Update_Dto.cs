using System.ComponentModel.DataAnnotations;

namespace Educational.DTO_Models.CourseDto
{
    public class Course_Create_Update_Dto
    {
        [Required]
        public required string Name { get; set; }
        [Required]

        public required string Description { get; set; }
        [Required]
        public required int Price { get; set; }
        [Required]
        public required int GradeId { get; set; }
    }
}
