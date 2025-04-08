
using Educational.Data;
using Educational.Options;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Educational.services;
using Educational.Repositories.Interfaces;
using Educational.Repositories;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Http.Features;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 100 * 1024 * 1024; 
});

// Configure multipart form data limits
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 100 * 1024 * 1024; 
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


var jwtOptions = builder.Configuration.GetSection("jwt").Get<JwtOptions>();

builder.Services.AddAuthentication()
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,options=>
    {
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtOptions.Issuer,
            ValidateAudience = true,
            ValidAudience = jwtOptions.Audience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.SigningKey))
        };
    });
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("jwt"));
builder.Services.AddScoped<CourseServices>();
builder.Services.AddScoped<GradeServices>();


builder.Services.AddScoped<IGradeRepository, GradeRepository>();

builder.Services.AddScoped<IcourseRepository,CourseRepository>();
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseStaticFiles(); 
var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
if (Directory.Exists(uploadsFolder))
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(uploadsFolder),
        RequestPath = "/Uploads" 
    });
}
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(builder =>
    builder.WithOrigins("http://localhost:3000") 
           .AllowAnyMethod()
           .AllowAnyHeader());



app.UseHttpsRedirection();
app.UseAuthentication(); 
app.UseAuthorization();
app.MapControllers();

app.Run();
