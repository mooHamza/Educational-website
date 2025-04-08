using Educational.Entities;

namespace Educational.DTO_Models.OptionDto
{
    public class Option_Create_Dto
    {
        public required string OptionText { get; set; }
        public bool IsCorrect { get; set; } = false;
    }
}
