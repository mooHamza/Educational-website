using System.ComponentModel.DataAnnotations.Schema;

namespace Educational.DTO_Models
{

    [NotMapped]
    public class Logindto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
