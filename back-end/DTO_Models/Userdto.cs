using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Educational.DTO_Models
{
    [NotMapped]
    public class Userdto
    {

        public required string FirstName { get; set; }

        public required string SecondName { get; set; }

        public required string Email { get; set; }

        public required string UserPassword { get; set; }

        public required string City { get; set; }

        public required string Phone { get; set; }

        public required int Grade { get; set; }


    }
}
