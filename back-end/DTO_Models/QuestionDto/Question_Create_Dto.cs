
using Educational.DTO_Models.OptionDto;

namespace Educational.Entities
{
    public class Question_Create_Dto
    {
        public required string QuestionText { get; set; }

        public required ICollection<Option_Create_Dto> Options { get; set; } = new List<Option_Create_Dto>();
    }
}
