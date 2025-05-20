
using System.Security.Claims;
using System.Text;
using Azure.Core;
using Educational.Data;
using Educational.DTO_Models;
using Educational.Entities;
using Educational.Exceptions;
using Educational.Mapper;
using Educational.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Educational.Options;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using Educational.DTO_Models.UserDto;
using Educational.DTO_Models.User_Answers;
using Microsoft.AspNetCore.Mvc;

namespace Educational.services
{
    public class UserServices
        (AppDbContext _context,
        UserManager<User> _userManager,
        RoleManager<IdentityRole> _roleManager,
        UserMapper _userMapper,
         IOptionsSnapshot<JwtOptions> _jwtOptions,
         ICourseRepository _courseRepository
        )
    {

        public async Task RegisterAsync(Registerdto user)
        {
            var newUser = _userMapper.ToEntity(user);
            var existingUserByName = await _userManager.FindByNameAsync(user.Email);
            if (existingUserByName != null)
            {
                throw new ConflictException("Username is already taken.");
            }
            var result = await _userManager.CreateAsync(newUser, user.Password);
                
            if (!result.Succeeded)
            {
                throw new RegistrationException("User registration failed", result.Errors);
            }

            if (!await _roleManager.RoleExistsAsync("User"))
            {
                await _roleManager.CreateAsync(new IdentityRole("User"));
            }
            await _userManager.AddToRoleAsync(newUser, "User");
            await _context.SaveChangesAsync();
        }

        public async Task<string> LoginAsync(Logindto logindto)
        {
            var user = await _userManager.FindByNameAsync(logindto.Email)
                ?? throw new UnauthorizedAccessException("Email or password are wrong");                

            var isValidPassword = await _userManager.CheckPasswordAsync(user, logindto.Password);
            if (!isValidPassword)
                throw new UnauthorizedAccessException("Email or password are wrong");

            var userRoles = await _userManager.GetRolesAsync(user);

            var token = CreateToken(user, userRoles);
            return token;
        }
        private string CreateToken(User user, IList<string> userRoles)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Value.SigningKey));
            var claims = new List<Claim>
            {
            new(JwtRegisteredClaimNames.Email, user.UserName!),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(ClaimTypes.NameIdentifier, user.Id),
            new("firstName", user.FirstName),
            new("secendName", user.SecendName)
            };

            foreach (var role in userRoles) 
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _jwtOptions.Value.Issuer,
                Audience = _jwtOptions.Value.Audience,
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1)

            };

            var TokenHandler = new JwtSecurityTokenHandler();

            var securityToken = TokenHandler.CreateToken(tokenDescriptor);

            var accessToken = TokenHandler.WriteToken(securityToken);

            return accessToken;
        }

        public async Task<IEnumerable<User_Get_Dto>> GetAllUsersAsync()
        {

            var users = await _userManager.Users
                .Include(u => u.Grade).ToListAsync();

            return await _userMapper.ToListReadDtoAsync(users);
            
        }
        public async Task<User_Get_Dto> GetUserAsync(string Id)
        {
            var user = await _userManager.Users
                    .AsNoTracking()
                    .Include(u => u.Grade)
                    .FirstOrDefaultAsync(u => u.Id == Id)
                    ?? throw new EntityNotFoundException(nameof(User),Id);


            var userRoles = await _userManager.GetRolesAsync(user);

            var userDto = _userMapper.ToReadDto(user, userRoles);

            return userDto;

        }
        
        public async Task UpdateUserAsync(Update_User_Dto Update_User_Dto,string Id)
        {
            var user = await _userManager.FindByIdAsync(Id)
                ?? throw new EntityNotFoundException(nameof(User), Id);
            var roles = await _userManager.GetRolesAsync(user);

            var updatedUser = await _userMapper.ToUpdatedEntity(user, Update_User_Dto, roles);

            await _userManager.UpdateAsync(updatedUser);
        }
        public async Task DeleteUserAsync(string Id)
        {
            var user = await _userManager.FindByIdAsync(Id)
                ?? throw new EntityNotFoundException(nameof(User), Id);

            await _userManager.DeleteAsync(user);
        }
        public async Task BookCourseAsync(string Id, int CourseId)
        {
            var course = await _courseRepository.GetByIdAsync(CourseId)
                ?? throw new EntityNotFoundException(nameof(Course), CourseId);
            
            var user = await _userManager.Users
                .Include(u => u.Courses)
                .Where(user => user.Id == Id).FirstOrDefaultAsync()
                ?? throw new EntityNotFoundException(nameof(User), Id);
            
            if (user.Courses.Contains(course))
            {
                throw new ConflictException("User is already enrolled in this course");
            }
            user.Courses.Add(course);
            await _context.SaveChangesAsync();
        }

        public async Task<object> GetUserCoursesAsync(string Id)
        {
            var user = await _userManager.Users.AsNoTracking()
                                            .Include(u => u.Courses)
                                            .AsSplitQuery()
                                            .FirstOrDefaultAsync(u => u.Id == Id)
                    ?? throw new EntityNotFoundException(nameof(User), Id);

            var courses = user.Courses.Select(c => new { c.Id, c.Name }).ToList();
            return courses;
        }

        public async Task AddHomeworkScoreAndAnswersAsync(string Id, int HomeworkId, int Score,List<User_AnswersDto> user_Answers)
        {
            var userExists = await _userManager.FindByIdAsync(Id);
            if (userExists == null)
            {
                throw new EntityNotFoundException(nameof(User), Id);
            }
            var Evaluation = await _context.Users_homeworks.Where(e => e.HomeworkId == HomeworkId && e.UserId == Id)
                  .FirstOrDefaultAsync();
            if (Evaluation != null)
                throw new ConflictException("you already have evaluation for this homework");


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
        }

        public async Task<object> GetEvaluaionAsync(string Id, int HomeworkId)
        {

            var Evaluation = await _context.Users_homeworks.Where(e => e.UserId == Id && e.HomeworkId == HomeworkId)
                                                            .FirstOrDefaultAsync()
                ?? throw new Exception("user have no evaluation for this homework");

            var user_Answers = await _context.Users_Answers.Where(x => x.HomeworkId == HomeworkId && x.UserId == Id)
                                                            .Select(x => new { x.QuestionId, x.OptionID })
                                                            .ToListAsync();
            return new { user_Answers, Evaluation.Score };
        }

        public async Task<object> GetUserEvaluaionsAsync(string Id)
        {
            var evaluations = await _context.Users_homeworks
                                           .Include(e => e.User)
                                           .Include(e => e.Homework)
                                           .Where(e => e.UserId == Id)
                                           .Select(e => new { e.UserId, e.User!.FirstName, e.User.SecendName, e.HomeworkId, e.Homework.Name, e.Score })
                                           .ToListAsync()
                ?? throw new EntityNotFoundException(nameof(User), Id);


            return evaluations;
        }
    }
}
