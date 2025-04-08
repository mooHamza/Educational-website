
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Educational.Entities;

namespace Educational.DTO_Models
{
    public class Week_Update_Dto
    {
        [Required]
        public required int WeekNumber { get; set; }
        [Required]
        public required string Content { get; set; }


    }
}
