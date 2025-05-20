using Educational.Data;
using Educational.Entities;
using Educational.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Educational.Repositories
{
    public class GradeRepository(AppDbContext _context) : BaseRepository<Grade>(_context), IGradeRepository
    {

        public async Task<Grade> GetGradeByName(string name)
        {
           return await _context.Grades.SingleOrDefaultAsync(g=>g.GradeName == name);
        }

    }
}
