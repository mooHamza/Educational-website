using System.ComponentModel.DataAnnotations;

namespace Educational.Entities
{
    public class Users_homeworks
    {
        [Key]
        public int UserId { get; set; }
        public User? User { get; set; }
        [Key]
        public int HomeworkId { get; set; }
        public Homework? Homework { get; set; }
        public int Score { get; set; }
    }
}
