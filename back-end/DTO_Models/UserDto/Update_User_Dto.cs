using Educational.DTO_Models.RoleDto;
using Educational.Entities;

namespace Educational.DTO_Models.UserDto
{
    public class Update_User_Dto
    {
        public string Email { get; set; } = null!;

        public string? Password { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string SecondName { get; set; } = null!;

        public string City { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public  ICollection<Role_Create_Update_Dto> Roles { get; set; } = new List<Role_Create_Update_Dto>();

    }
}
