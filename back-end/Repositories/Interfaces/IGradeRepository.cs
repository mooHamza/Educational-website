using Educational.Entities;

namespace Educational.Repositories.Interfaces
{
    public interface IGradeRepository : IBaseRepository<Grade> 
    {
        Task<Grade?> GetGradeByNameAsync(string name);


    }
}
