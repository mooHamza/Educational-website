using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Educational.DTO_Models.LectureDto;
using Educational.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Educational.DTO_Models
{
    public class Week_CreateDto
    {
        [Required]
        public  int WeekNumber { get; set; }
        [Required]
        public string Content { get; set; }
        public ICollection<Lecture_Create_UpdateDto>? Lectures { get; set; }

    }
}
