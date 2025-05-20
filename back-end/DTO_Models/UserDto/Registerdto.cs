using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Educational.DTO_Models
{
    public class Registerdto
    {
        [Required]
        public required string FirstName { get; set; }

        [Required]

        public required string SecondName { get; set; }

        [Required,EmailAddress]
        public required string Email { get; set; }

        [DataType(DataType.Password)]
        [Required]
        public required string Password { get; set; }

        [DataType(DataType.Password)]
        [Required,Compare("Password")]
        public required string ConfirmedPassword { get; set; }

        [Required]
        public required string City { get; set; }

        [Required]
        [Phone]
        [RegularExpression(@"^(010|011|012|015)\d{8}$", ErrorMessage = "enter valid phone number.")]
        public required string PhoneNumber { get; set; }

        [Required]
        public required int GradeId { get; set; }


    }
}
