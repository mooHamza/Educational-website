using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Educational.Entities;
[NotMapped]
public partial class Grade
{
    public int Id { get; set; }

    public string GradeName { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();

}
