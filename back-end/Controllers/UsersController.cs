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
using Educational.Options;
using Educational.UserFilters;
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
    
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IOptionsSnapshot<JwtOptions> jwtOptions;

        public UsersController(AppDbContext context,IOptionsSnapshot<JwtOptions> JwtOptions)
        {
            _context = context;
            jwtOptions = JwtOptions;
        }

   
        [HttpPost("register")]
        [TypeFilter(typeof(RegisterFilters))]
        public async Task<IActionResult> Register(Userdto user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return validation errors
            }

            var defaultRole = await _context.Roles.FirstOrDefaultAsync(R => R.RoleName == "User");

            if (defaultRole == null)
            {
                defaultRole = new Role
                {
                    RoleName = "User"
                };
                _context.Roles.Add(defaultRole);
                await _context.SaveChangesAsync();
            }

            user.UserPassword = BCrypt.Net.BCrypt.HashPassword(user.UserPassword);

            var newUser = new User
            {
                FirstName = user.FirstName,
                SecendName = user.SecondName,
                Email = user.Email,
                City = user.City,
                GradeId = user.Grade, 
                Phone = user.Phone,
                Password = user.UserPassword,
                Roles = new List<Role> { defaultRole }
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok("user registered successfully");
        }

        [HttpPost("login")]
        public async Task<IActionResult> login(Logindto loginUser)
        {
            if (loginUser == null)
            {
                return BadRequest("no user data passed");
            }

            var user = await _context.Users
                                     .Include(u=>u.Roles)
                                      .SingleOrDefaultAsync(u => u.Email == loginUser.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginUser.Password, user.Password))
            {
                return BadRequest("Email or password are wrong");
            }

            var token = CreateToken(user);

            return Ok(new { Token = token });
        }
            private string CreateToken(User user) 
            {
             var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Value.SigningKey));

            var claims = new List<Claim>
            {
                new Claim("Id", user.Id.ToString())
            };

            if (user.Roles != null && user.Roles.Any())
            {
                claims.AddRange(user.Roles.Select(role => new Claim(ClaimTypes.Role, role.RoleName)));
            }
            var tokenDescriptor = new SecurityTokenDescriptor
            {
               Issuer = jwtOptions.Value.Issuer,
               Audience = jwtOptions.Value.Audience,
               SigningCredentials = new SigningCredentials(signingKey,SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1)

            };

            var TokenHandler = new JwtSecurityTokenHandler();

            var securityToken = TokenHandler.CreateToken(tokenDescriptor);

            var accessToken = TokenHandler.WriteToken(securityToken);

            return accessToken;
            }

        [HttpGet]
        public async Task<ActionResult> GetAllUsers()
        {
            var users = await _context.Users
                                        .Include(u=>u.Grade)
                                        .Include(u=>u.Roles)
                                        .ToListAsync();

            var usersDto = users.Select(u => new Get_User_Dto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                SecondName = u.SecendName,
                Email = u.Email,
                City = u.City,
                Phone = u.Phone,
                GradeName = u.Grade.GradeName,
                Roles = u.Roles.Select(r => new Role_Get_Dto
                {
                    Id =r.Id,
                    RoleName = r.RoleName,
                }).ToList()
            });

            return Ok(usersDto);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Get_User_Dto>> GetUser(int Id)
        {
            var user = await _context.Users
                                       .AsNoTracking()
                                      .Include(u=>u.Grade)
                                      .Include(u=>u.Roles)
                                      .FirstOrDefaultAsync(u=>u.Id == Id);

            if (user == null)
            {
                throw new KeyNotFoundException($"user with Id {Id} not found");
            }
            var userDto = new Get_User_Dto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                SecondName = user.SecendName,
                Email = user.Email,
                City = user.City,
                GradeName = user.Grade.GradeName,
                Phone = user.Phone,
                Roles = user.Roles.Select(r => new Role_Get_Dto
                {
                    Id = r.Id,
                    RoleName = r.RoleName,
                }).ToList()
            };

                return Ok(userDto);

            
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteUser(int Id)
        {
            var user = _context.Users.Include(u => u.Roles).FirstOrDefault(u => u.Id == Id);
            if (user == null)
            {
                throw new KeyNotFoundException("user not found");
            }
        
                user.Roles.Clear(); 
                _context.Users.Remove(user);
               await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{Id}/courses/{CourseId}")]
        public async Task<ActionResult> BookCourse(int Id,int CourseId)
        {
            var course = await _context.Courses.FindAsync(CourseId);
            if (course == null)
            {
                throw new KeyNotFoundException($"course with Id {CourseId} not found");
            }
            var user = await _context.Users.Include(u=> u.Courses).Where(user=>user.Id == Id).FirstOrDefaultAsync();
            if (user == null)
            {
                throw new KeyNotFoundException($"user with Id {Id} not found");
            }
            if (user.Courses == null)  
            {
                user.Courses = new List<Course>();
            }

            if (user.Courses.Contains(course))  
            {
                return BadRequest("User is already enrolled in this course");
            }
            user.Courses.Add(course);
            await _context.SaveChangesAsync();
            return Created($"api/Users/{Id}/courses/{CourseId}", "course Booked successfully ");
            }

        [HttpGet("{Id}/courses")]
        public async Task<ActionResult> GetUserCourses(int Id)
        {
            var user = await _context.Users.AsNoTracking()
                                            .Include(u=>u.Courses)
                                            .AsSplitQuery()
                                            .FirstOrDefaultAsync(u=>u.Id == Id);
            if (user == null)
            {
                throw new KeyNotFoundException($"user with Id {Id} not found");
            }

            var courses = user.Courses?.Select(c => new { c.Id, c.Name }).ToList(); 
            return Ok(courses);
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditUser(int Id,Update_User_Dto user ) 
        {
            var oldUser = await _context.Users
                .Include(u => u.Roles)
                .FirstOrDefaultAsync(u=>u.Id == Id);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return validation errors
            }

            oldUser.FirstName = user.FirstName;
            oldUser.SecendName = user.SecondName;
            oldUser.Phone = user.Phone;
            oldUser.Email = user.Email;
            oldUser.City = user.City;

            oldUser.Roles.Clear();

            foreach(var role in user.Roles)
            {
                var isExist = await _context.Roles.AnyAsync(r => r.RoleName == role.RoleName);
                if(!isExist)
                {
                    var newRole = new Role { RoleName = role.RoleName };
                    oldUser.Roles.Add(newRole);
                }
                else
                {
                   var ExistRole = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == role.RoleName);
                    
                    oldUser.Roles.Add(ExistRole);
                }
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{Id}/homeworks/{HomeworkId}/score/{Score}")]
        public async Task<IActionResult> HomeworkScore(int Id, int HomeworkId, int Score,[FromBody] List<User_AnswersDto>user_Answers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var Evaluation = await _context.Users_homeworks.Where(e => e.HomeworkId == HomeworkId && e.UserId == Id)
                  .FirstOrDefaultAsync();
            if (Evaluation != null)
            {
                throw new Exception("you already have evaluation for this homework");
            }

            foreach (var answer in user_Answers)
            {
                _context.Users_Answers.Add(new User_Answer
                {
                    UserId = Id,
                    QuestionId = answer.QuestionId,
                    OptionID = answer.OptionId,
                    HomeworkId = HomeworkId
                });
            }
            var NewEvaluation = new Users_homeworks
            {
                UserId = Id,
                HomeworkId = HomeworkId,
                Score = Score
            };
            _context.Users_homeworks.Add(NewEvaluation);
            await _context.SaveChangesAsync();
            return Created("api/user_homeworks","evaluation added successfully");
                }

        [HttpGet("{Id}/homeworks/{HomeworkId}")]
        public async Task<IActionResult>GetEvaluaion(int Id, int HomeworkId)
        {
            var Evaluation = await _context.Users_homeworks.Where(e=>e.UserId==Id&&e.HomeworkId==HomeworkId)
                                                            .FirstOrDefaultAsync();
            if (Evaluation == null)
            {
                throw new KeyNotFoundException("user have no evaluation for this homework");
            }

            var user_Answers = await _context.Users_Answers.Where(x => x.HomeworkId == HomeworkId && x.UserId == Id)
                                                            .Select(x => new { x.QuestionId, x.OptionID })
                                                            .ToListAsync();
           return Ok(new { user_Answers , Evaluation.Score });
        }

        [HttpGet("{Id}/homeworks")]
        public async Task<IActionResult> GetEvaluaions(int Id)
        {
            var Evaluations = await _context.Users_homeworks
                                           .Include(e => e.User)
                                           .Include(e => e.Homework)
                                           .Where(e => e.UserId == Id)
                                           .Select(e=>new {e.UserId, e.User.FirstName, e.User.SecendName,e.HomeworkId ,e.Homework.Name,e.Score })
                                           .ToListAsync();
                                           
            if (Evaluations == null)
            {
                throw new KeyNotFoundException("user have no evaluations");
            }
            return Ok(Evaluations);
        }

    }




}

