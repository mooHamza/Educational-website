
using Educational.Entities;

namespace Educational.DTO_Models.OptionDto
{
    public class Option_Get_Dto
    {
        public int Id { get; set; }

        public required string OptionText { get; set; }
        public bool IsCorrect { get; set; } = false;
    }
}
