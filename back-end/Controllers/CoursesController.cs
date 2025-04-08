using Educational.Data;

using Educational.DTO_Models;
using Educational.DTO_Models.CourseDto;
using Educational.DTO_Models.LectureDto;
using Educational.Entities;
using Educational.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Educational.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CoursesController( CourseServices _service,AppDbContext _context) : ControllerBase
    {
   
        [HttpPost("full")]
        [Consumes("multipart/form-data")]

        public async Task<IActionResult> CreateFullCourse([FromForm] FullCourse_Create_Dto coursedto)
        {
            await _service.SetCoursesAsync(coursedto);
            return Created("api/courses", "course created successfully");
        }

        [HttpPost]

        public async Task<IActionResult> CreateCourse(CourseCreate_Dto Course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
               await _service.CreateCourseAsync(Course);
                return Created("api/courses","course created successfully");
            

        }
        [HttpGet]
        public async Task<ActionResult<List<CourseGetDto>>> GetCourse() 
        {
            var courses = await _service.GetCourses();
            return Ok(courses);
        }
        [HttpGet("{Id}")]

        public async Task<IActionResult>GetCoursee(int Id)
        {
            var course = await _context.Courses.FindAsync(Id);
            return Ok(new { Course = course });
        }
        [HttpPut("{Id}")]

        public async Task<ActionResult> UpdateCourse(Course_Update_Dto UpdatedCourse,int Id)
        {
            await _service.UpdateCourseAsync(UpdatedCourse, Id);
            return NoContent();
        }

        [HttpDelete("{Id}")]

        public async Task<ActionResult> DeleteCourse(int Id)
        {
            await _service.DeleteCourseAsync(Id);
            return NoContent();
        }

        /// <summary>
        /// start week part
        /// </summary>
        /// <param ></param>
        /// <returns></returns>

        [HttpPost("{CourseId}/weeks")]
 
        public async Task<IActionResult> AddWeek(Week_CreateDto week,int CourseId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                await _service.AddWeekAsync(week,CourseId);
                return Created("api/weeks", "week created successfully");
            }
        }

        [HttpPut("{CourseId}/weeks/{Id}")]

        public async Task<IActionResult> UpdateWeek(Week_Update_Dto Week,int CourseId, int Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                await _service.UpdateWeekAsync(Week, CourseId, Id);
                return NoContent();
            }
        }

        [HttpDelete("{CourseId}/weeks/{Id}")]

        public async Task<IActionResult> DeleteWeek(int CourseId, int Id)
        {
            await _service.DeleteWeekAsync(Id);
            return NoContent();
        }


        /// <summary>
        /// start Lectures part
        /// </summary>
        /// <param ></param>
        /// <returns></returns>

        [HttpPost("{CourseId}/weeks/{WeekId}/lectures")]
       
        public async Task<IActionResult> AddLecture(Lecture_Create_UpdateDto lecture,int CourseId,int WeekId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                await _service.AddLectureAsync(lecture, WeekId);
                return Created("api/courses/lectures", "lecture created successfully");
            }

        }
        [HttpPut("{CourseId}/weeks/{WeekId}/lectures/{LectureId}")]
        [Consumes("multipart/form-data")]
    
        public async Task<IActionResult> UpdateLecture(Lecture_Create_UpdateDto lecture,int CourseId, int WeekId,int LectureId)
        {
            if (lecture == null)
            {
                return BadRequest("lecture data not send");
            }
            await _service.UpdateLectureAsync(lecture, WeekId, LectureId);
            return NoContent();


        }
        [HttpDelete("{CourseId}/weeks/{WeekId}/lectures/{LectureId}")]

        public async Task<IActionResult> DeleteLecture(int CourseId, int WeekId, int LectureId)
        {
            await _service.DeleteLectureAsync(LectureId);
            return NoContent();
        }
        /// <summary>
        /// start Homeworks part
        /// </summary>
        /// <param ></param>
        /// <returns></returns>

        [HttpPost("{CourseId}/weeks/{WeekId}/lectures/{LectureId}/homeworks")]

        public async Task<IActionResult> AddHomework(Hw_Create_Dto homework,int LectureId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _service.AddHomeWork(homework, LectureId);
            return Created("lectures", "lecture created successfully");
        }

        [HttpPut("{CourseId}/weeks/{WeekId}/lectures/{LectureId}/homeworks/{HomeworkId}")]

        public async Task<IActionResult> UpdateHomework(Hw_Create_Dto homework,int HomeworkId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _service.UpdateHomeWork(homework, HomeworkId);
            return NoContent();
        }

        [HttpDelete("{CourseId}/weeks/{WeekId}/lectures/{LectureId}/homeworks/{homewokId}")]
       
        public async Task<IActionResult> RemoveHomework(int homewokId)
        {
            await _service.DeleteHomework(homewokId);
            return NoContent();
        }

    }
}
