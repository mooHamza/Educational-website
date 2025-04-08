using System.Net.Mail;
using Microsoft.AspNetCore.Mvc.Filters;
using Educational.DTO_Models;
using Microsoft.AspNetCore.Mvc;
using Educational.Data;
using Educational.Entities;
using System.ComponentModel.DataAnnotations.Schema;
namespace Educational.UserFilters;
[NotMapped]
public class RegisterFilters : ActionFilterAttribute
{
    private readonly AppDbContext _context;

    public RegisterFilters(AppDbContext context)
    {
          _context = context;
    }
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (!context.ActionArguments.TryGetValue("user", out var userobj) || userobj is not Userdto user)
        {
            context.Result = new BadRequestObjectResult(new { Error = "User data is required" });
            return;
        }


        if (String.IsNullOrEmpty(user.FirstName) )
        {
            context.Result = new BadRequestObjectResult(new { firstName = "first name is required" });
            return;
        }
        if ( String.IsNullOrEmpty(user.SecondName))
        {
            context.Result = new BadRequestObjectResult(new { secondName = "second name is required" });
            return;
        }

        if (!ISValidEmail(user.Email))
        {
            context.Result = new BadRequestObjectResult(new { email = "email format is not correct" });
            return;
        }

        if (_context.Users.Any(e => e.Email == user.Email)) 
        {
            context.Result = new ConflictObjectResult(new { existEmail = "email is already exist " });
            return;
        }


        if (String.IsNullOrEmpty(user.UserPassword) || user.UserPassword.ToArray().Length < 8)
        {
            context.Result = new BadRequestObjectResult(new { password = "password should be at least 8 character" });
            return;
        }

        if(user.Phone.Length != 11)
        {
            context.Result = new BadRequestObjectResult(new { phone = "Enter valid phone number" });
            return;
        }


        await next();
    }
    private bool ISValidEmail(string email)
    {
        try
        {
            var addr = new MailAddress(email);
            return addr.Address == email;
        }
        catch { 

                return false;
        }


    }
}


   
