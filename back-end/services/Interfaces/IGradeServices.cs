namespace Educational.services.Interfaces
{
    public interface IGradeServices 
    {
        Task CreateGradeAsync(Grade_Create_Update_Dto Grade_Create_Dto);

         Task DeleteGradeAsync(int Id);

        Task EditGradeAsync(Grade_Create_Update_Dto Grade_Update_Dto, int Id);

        Task<Grade_Get_Dto> GetGradeByIdAsync(int Id);

        Task<IEnumerable<Grade_Get_Dto>> GetAllGradesAsync();


    }
}
