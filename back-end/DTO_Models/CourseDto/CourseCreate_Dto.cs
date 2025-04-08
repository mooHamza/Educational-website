using System.ComponentModel.DataAnnotations;

namespace Educational.DTO_Models.CourseDto
{
    public class CourseCreate_Dto
    {
        [Required]
        public  string Name { get; set; }
        [Required]

        public  string Description { get; set; }
        [Required]
        public  int Price { get; set; }
        [Required]
        public int GradeId { get; set; }
    }
}
