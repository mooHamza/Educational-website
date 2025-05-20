using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Educational.Entities;
[NotMapped]
public partial class Grade
{
    public int Id { get; set; }

    public required string GradeName { get; set; } 

    public virtual ICollection<User> Users { get; set; } = [];
    public virtual ICollection<Course> Courses { get; set; } = [];

}
