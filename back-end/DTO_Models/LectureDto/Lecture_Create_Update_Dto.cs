using Educational.Entities;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.IO;

namespace Educational.DTO_Models.LectureDto
{
    public class Lecture_Create_Update_Dto
    {
        public required string Name { get; set; }
        public required IFormFile File { get; set; }

        public ICollection<Homework_Create_Update_Dto>? Homeworks { get; set; }
    }
}