using Educational.Data;
using Educational.Entities;
using Educational.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Educational.Repositories
{
    public class GradeRepository(AppDbContext _context) : IGradeRepository
    {
        public async Task CreateGradeAsync(Grade_Create_Dto Grade_Create_Dto)
        {
            var grade = await _context.Grades.SingleOrDefaultAsync(g=>g.GradeName == Grade_Create_Dto.GradeName);
            if (grade != null) 
            {
                throw new Exception("grade is already Exist");
            }
            var newGrade = new Grade
            {
                GradeName = Grade_Create_Dto.GradeName
            };
            _context.Grades.Add(newGrade);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Grade_Get_Dto>> GetAllGradesAsync()
        {
            var Grades =  await _context.Grades.ToListAsync();

            var GradesDto = Grades.Select(g=> new Grade_Get_Dto
            {
                Id = g.Id,
                GradeName = g.GradeName,
            }).ToList();

            return GradesDto;
        }

        public async Task<Grade_Get_Dto> GetGradeAsync(int Id)
        {
            var Grade = await _context.Grades.FindAsync(Id);
            if (Grade == null)
            {
                throw new KeyNotFoundException($"Grade with Id {Id} is not found");
            }

            var GradeDto = new Grade_Get_Dto
            {
                Id = Grade.Id,
                GradeName = Grade.GradeName,
            };
            return GradeDto;
        }

        public async Task EditGradeAsync(Grade_Update_Dto Grade_Update_Dto, int Id)
        {
            var Grade = await _context.Grades.FindAsync(Id);
            if (Grade == null)
            {
                throw new KeyNotFoundException($"Grade with id {Id} not found");
            }

            Grade.GradeName = Grade_Update_Dto.GradeName;
            await _context.SaveChangesAsync();
        }
        public async Task DeleteGradeAsync(int Id)
        {
            var Grade = await _context.Grades.FindAsync(Id);
            if (Grade == null)
            {
                throw new KeyNotFoundException($"Grade with id {Id} not found");
            }
            _context.Grades.Remove(Grade);
            await _context.SaveChangesAsync();
        }

 
    }
}
