
using System.ComponentModel.DataAnnotations.Schema;
using Educational.DTO_Models.RoleDto;
using Educational.Entities;


namespace Educational.DTO_Models
{
    public class Get_User_Dto
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }

        public required string SecondName { get; set; }

        public required string Email { get; set; }

        public required string City { get; set; }

        public required string Phone { get; set; }

        public required string GradeName { get; set; }

        public required List<Role_Get_Dto> Roles { get; set; } = new List<Role_Get_Dto>();



    }
}
