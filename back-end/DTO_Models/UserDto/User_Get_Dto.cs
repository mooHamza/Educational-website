
using System.ComponentModel.DataAnnotations.Schema;
using Educational.DTO_Models.RoleDto;
using Educational.Entities;
using Microsoft.AspNetCore.Identity;


namespace Educational.DTO_Models
{
    public class User_Get_Dto
    {
        public required string Id { get; set; }
        public required string FirstName { get; set; }

        public required string SecondName { get; set; }

        public required string Email { get; set; }

        public required string City { get; set; }

        public required string Phone { get; set; }

        public required string GradeName { get; set; }

        public required IList<string> Roles { get; set; } = [];



    }
}
