using Educational.DTO_Models.RoleDto;
using Educational.Entities;

namespace Educational.DTO_Models.UserDto
{
    public class Update_User_Dto
    {
        public string? Email { get; set; }

        public string? FirstName { get; set; } 

        public string? SecondName { get; set; } 

        public string? City { get; set; }

        public string? Phone { get; set; }
        public int? GradeId { get; set; }

        public IList<string>? Roles { get; set; } 

    }
}
