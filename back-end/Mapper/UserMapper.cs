using Educational.DTO_Models;
using Educational.DTO_Models.UserDto;
using Educational.Entities;
using Microsoft.AspNetCore.Identity;

namespace Educational.Mapper
{
    public class UserMapper(UserManager<User> _userManager,RoleManager<IdentityRole> _roleManager)
    {
        public  User ToEntity( Registerdto userDto)
        {
            return new User
            {
               FirstName = userDto.FirstName,
               SecendName = userDto.SecondName,
               UserName = userDto.Email,
               PhoneNumber = userDto.PhoneNumber,
               City = userDto.City,
               GradeId = userDto.GradeId,
               
            };
        }
        public User_Get_Dto ToReadDto(User User,IList<string> roles)
        {
            return new User_Get_Dto
            {
                Id = User.Id,
                FirstName = User.FirstName,
                SecondName = User.SecendName,
                Email = User.UserName!,
                City = User.City,
                GradeName = User.Grade!.GradeName,
                Phone = User.PhoneNumber!,
                Roles = roles
            };
        }
        public async Task<User> ToUpdatedEntity(User User, Update_User_Dto UserUpdate, IList<string> roles)
        {
            User.FirstName = UserUpdate.FirstName ?? User.FirstName;
            User.SecendName = UserUpdate.SecondName ?? User.SecendName;
            User.City = UserUpdate.City ?? User.City;
            User.UserName = UserUpdate.Email ?? User.UserName;
            User.PhoneNumber = UserUpdate.Phone ?? User.PhoneNumber;
            User.GradeId = UserUpdate.GradeId ?? User.GradeId;


            if (UserUpdate.Roles != null)
            {
                await _userManager.RemoveFromRolesAsync(User, roles);

                foreach (var role in UserUpdate.Roles)
                {
                    if (!await _roleManager.RoleExistsAsync(role))
                    {
                        await _roleManager.CreateAsync(new IdentityRole(role));
                    }

                    await _userManager.AddToRoleAsync(User, role);
                }

                roles = UserUpdate.Roles;
            }

            return User;
        }
        public async Task< IEnumerable<User_Get_Dto>> ToListReadDtoAsync(IEnumerable<User> Users)
        {
            var usersDto = new List<User_Get_Dto>();

            foreach (var user in Users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                usersDto.Add(new User_Get_Dto
                {
                    Id=user.Id,
                    FirstName = user.FirstName,
                    SecondName = user.SecendName,
                    City = user.City,
                    GradeName = user.Grade!.GradeName,
                    Email = user.UserName!,
                    Phone = user.PhoneNumber!,
                    Roles = roles.ToList()
                });
            }

            return usersDto;
        }
    }
}
