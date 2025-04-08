using Educational.Data;
using Educational.Entities;

using Educational.DTO_Models.RoleDto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Educational.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController(AppDbContext _context): ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> createRole(Role_Create_Update_Dto Role_Create_Dto)
        {
            var isExist = await _context.Roles.AnyAsync(r => r.RoleName == Role_Create_Dto.RoleName);
            if (isExist)
            {
                throw new BadHttpRequestException("role is already exist");
            }
            else
            {
                var role = new Role
                {
                    RoleName = Role_Create_Dto.RoleName
                };
                _context.Roles.Add(role);
                await _context.SaveChangesAsync();

                return Created("api/Roles", "role has created successfully");
            }
            
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> EditRole(Role_Create_Update_Dto Role_Create_Update_Dto,int Id)
        {
            var role = await _context.Roles.FindAsync(Id);
            role.RoleName = Role_Create_Update_Dto.RoleName;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<List<Role_Get_Dto>>> GetRoles()
        {
            var roles = await _context.Roles.ToListAsync();
            var rolesDto = roles.Select(r=>new Role_Get_Dto
            {
                Id = r.Id,
                RoleName = r.RoleName
            }).ToList();

            return Ok(rolesDto);
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteRole(int Id)
        {
            var role = await _context.Roles.Include(r => r.Users)
                                                   .FirstOrDefaultAsync(r=>r.Id == Id);
            if (role == null)
            {
                throw new BadHttpRequestException("role not found");
            }
            else
            {
                role.Users.Clear();
                await _context.SaveChangesAsync();


                _context.Roles.Remove(role);
                await _context.SaveChangesAsync();
                return NoContent();

            }
         

        }
    }
}
