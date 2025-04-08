using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Educational.Entities;
public  class Role
{
    public int Id { get; set; }
    public string RoleName { get; set; } = null!;


    public  ICollection<User>? Users { get; set; } = new List<User>();
}
