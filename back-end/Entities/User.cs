using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Educational.Entities;
public partial class User : IdentityUser
{
    public required string FirstName { get; set; } 

    public required string SecendName { get; set; }

    public required string City { get; set; }

    public int GradeId { get; set; }

    public  Grade? Grade { get; set; } 

    public ICollection<Course> Courses { get; set; } = [];
    public ICollection<Users_homeworks> Users_homeworks { get; set; } = [];
    public ICollection<User_Answer> Users_Answers { get; set; } = [];


}
