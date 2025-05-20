using Educational.Data;
using Educational.Entities;
using Educational.Exceptions;
using Educational.Mapper;
using Educational.Repositories.Interfaces;
using Educational.services.Interfaces;
using Microsoft.EntityFrameworkCore;
 

namespace Educational.services
{
    public class GradeServices(AppDbContext _context,IGradeRepository _repository):IGradeServices
    {
        public async Task CreateGradeAsync(Grade_Create_Update_Dto Grade_Create_Dto)
        {
            var grade = await _repository.GetGradeByName(Grade_Create_Dto.GradeName);
            if (grade != null)
            {
                throw new ConflictException("grade is already Exist");
            }
            var newGrade = Grade_Create_Dto.ToEntity();

            await _repository.AddAsync(newGrade);
            await _context.SaveChangesAsync();
        }
        public async Task<Grade_Get_Dto> GetGradeByIdAsync(int Id)
        {
           var grade = await _repository.GetByIdAsync(Id)
                ?? throw new EntityNotFoundException(nameof(Grade), Id);

            var GradeReadDto = grade.ToReadDto();

            return GradeReadDto;
        }
        public async Task<IEnumerable<Grade_Get_Dto>> GetAllGradesAsync()
        {
            var Grades = await _repository.GetAllAsync();

            var GradeDtos = Grades.ToListReadDto();
     
            return GradeDtos;
        }

        public async Task EditGradeAsync(Grade_Create_Update_Dto Grade_Update_Dto, int Id)
        {

            var grade = await _repository.GetByIdAsync(Id)
                ??
                 throw new EntityNotFoundException(nameof(Grade),Id);

            grade.ToUpdatedEntity(Grade_Update_Dto);
             _repository.Update(grade);
            await _context.SaveChangesAsync();

        }
        public async Task DeleteGradeAsync(int Id)
        {
            var grade = await _context.Grades.FindAsync(Id)
                ?? throw new EntityNotFoundException(nameof(Grade), Id);

            _repository.Delete(grade);
            await _context.SaveChangesAsync();
        }

    }
}
