using System.ComponentModel.DataAnnotations.Schema;
using Educational.DTO_Models.LectureDto;

namespace Educational.DTO_Models
{
    public class Week_Get_Dto
    {
        public int Id {  get; set; }
        public required int WeekNumber { get; set; }
        public required string Content { get; set; }

        public ICollection<Lecture_Get_Dto>? Lectures { get; set; }

    }
}
