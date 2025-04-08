using Educational.Entities;
using Educational.Repositories.Interfaces;

namespace Educational.services
{
    public class GradeServices(IGradeRepository _repository)
    {
        public async Task CreateGradeAsync(Grade_Create_Dto Grade_Create_Dto)
        {
            await _repository.CreateGradeAsync(Grade_Create_Dto);
        }

        public async Task DeleteGradeAsync( int Id)
        {
            await _repository.DeleteGradeAsync( Id);
        }
        public async Task EditGradeAsync(Grade_Update_Dto Grade_Update_Dto, int Id)
        {
            await _repository.EditGradeAsync(Grade_Update_Dto, Id);
        }

        public async Task<List<Grade_Get_Dto>> GetAllGradesAsync()
        {
            return await _repository.GetAllGradesAsync();
        }

        public async Task<Grade_Get_Dto> GetGradeAsync(int Id)
        {
            return await _repository.GetGradeAsync(Id);
        }
    }
}
