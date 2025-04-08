using Educational.Entities;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.IO;

namespace Educational.DTO_Models.LectureDto
{
    public class Lecture_Create_UpdateDto
    {
        public  string Name { get; set; }
        public IFormFile File { get; set; }

        public ICollection<Hw_Create_Dto>? Homeworks { get; set; }
    }
}