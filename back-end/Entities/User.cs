using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Educational.Entities;
[NotMapped]

public partial class User
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string SecendName { get; set; } = null!;

    public string City { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public int GradeId { get; set; }

    public virtual Grade Grade { get; set; } = null!;

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
    public ICollection<Course>? Courses { get; set; } = new List<Course>();
    public ICollection<Users_homeworks>? Users_homeworks { get; set; } = new List<Users_homeworks>();
    public ICollection<User_Answer>? Users_Answers { get; set; } = new List<User_Answer>();

}
