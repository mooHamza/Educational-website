using Educational.Entities;

namespace Educational.Repositories.Interfaces
{
    public interface IGradeRepository
    {
        public  Task CreateGradeAsync(Grade_Create_Dto Grade_Create_Dto);

        public  Task<Grade_Get_Dto> GetGradeAsync(int Id);
        public  Task<List<Grade_Get_Dto>> GetAllGradesAsync();

        public Task EditGradeAsync(Grade_Update_Dto Grade_Update_Dto,int Id);

        public  Task DeleteGradeAsync(int Id);


    }
}
