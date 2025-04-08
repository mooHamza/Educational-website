
using Educational.Entities;

namespace Educational.DTO_Models.LectureDto
{
    public class Lecture_Get_Dto
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public required string Url { get; set; }

        public ICollection<Homework_Get_Dto>? Homeworks { get; set; }
    }
}