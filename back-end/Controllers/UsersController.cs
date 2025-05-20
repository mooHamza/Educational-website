using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using Educational.Data;
using Educational.DTO_Models;
using Educational.DTO_Models.RoleDto;
using Educational.DTO_Models.User_Answers;
using Educational.DTO_Models.UserDto;
using Educational.Entities;
using Educational.Exceptions;
using Educational.Options;
using Educational.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Educational.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UsersController(UserServices _service) : ControllerBase
    {
   

        [HttpPost("register")]
        public async Task<IActionResult> Register(Registerdto user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await _service.RegisterAsync(user);
                return Ok("user registered successfully");
            }
            catch (RegistrationException ex)
            {
                return BadRequest (new
                {
                    message = ex.Message,
                    errors = ex.Errors.Select(e => e.Description)
                });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> login(Logindto loginUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var token = await _service.LoginAsync(loginUser);

            return Ok(new { Token = token });
        }


        [HttpGet]
        public async Task<ActionResult> GetAllUsers()
        {
            var usersDto = await _service.GetAllUsersAsync();

            return Ok(usersDto);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<User_Get_Dto>> GetUser(string Id)
        {
            var user = await _service.GetUserAsync(Id);

            return Ok(user);

        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteUser(string Id)
        {
            await _service.DeleteUserAsync(Id);

            return NoContent();
        }

        [HttpPost("{Id}/courses/{CourseId}")]
        public async Task<ActionResult> BookCourse(string Id, int CourseId)
        {
            await _service.BookCourseAsync(Id, CourseId);
            return Created($"api/Users/{Id}/courses/{CourseId}", "course Booked successfully ");
        }

        [HttpGet("{Id}/courses")]
        public async Task<ActionResult> GetUserCourses(string Id)
        {
            var userCourses = await _service.GetUserCoursesAsync(Id);
            return Ok(userCourses);
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateUser(string Id, Update_User_Dto user)
        {
            await _service.UpdateUserAsync(user,Id);
            return NoContent();
        }

        [HttpPost("{Id}/homeworks/{HomeworkId}/score/{Score}")]
        public async Task<IActionResult> HomeworkScore(string Id, int HomeworkId, int Score, [FromBody] List<User_AnswersDto> user_Answers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _service.AddHomeworkScoreAndAnswersAsync(Id,HomeworkId, Score, user_Answers);
            return Created("api/user_homeworks", "evaluation added successfully");
        }

        [HttpGet("{Id}/homeworks/{HomeworkId}")]
        public async Task<IActionResult> GetEvaluaion( string Id, int HomeworkId)
        {
            var evaluation = await _service.GetEvaluaionAsync(Id, HomeworkId);
            return Ok(evaluation);
        }

        [HttpGet("{Id}/homeworks")]
        public async Task<IActionResult> GetUserEvaluaions(string Id)
        {
            var evaluations = await _service.GetUserEvaluaionsAsync(Id);

            return Ok(evaluations);
        }

    }




}

