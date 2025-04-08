using Educational.services;
using Educational.Entities;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Educational.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradesController(GradeServices _service) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> CreateGrade(Grade_Create_Dto Grade_Create_Dto)
        {
            await _service.CreateGradeAsync(Grade_Create_Dto);
            return Created("api/Grades", "Grade created successfully");
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Grade_Get_Dto>> GetGrade(int Id)
        {
          var Grade =  await _service.GetGradeAsync(Id);
            return Ok(Grade);
        }

        [HttpGet]
        public async Task<ActionResult<List<Grade_Get_Dto>>> GetGrades()
        {
           var Grades =  await _service.GetAllGradesAsync();
            return Ok(Grades);
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteGrade(int Id)
        {
            await _service.DeleteGradeAsync(Id);
            return NoContent();
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> EditGrade(Grade_Update_Dto Grade_Update_Dto, int Id)
        {
            await _service.EditGradeAsync(Grade_Update_Dto, Id);
            return NoContent();
        }
    }
}
