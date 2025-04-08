

using Educational.DTO_Models.OptionDto;

namespace Educational.Entities
{
    public class Question_Get_Dto
    {
        public int Id { get; set; }

        public required string QuestionText { get; set; }

        public required ICollection<Option_Get_Dto> Options { get; set; } = new List<Option_Get_Dto>();
    }
}
