namespace Educational.Repositories.Interfaces;
using Educational.Entities;
using Educational.DTO_Models;
using Educational.DTO_Models.CourseDto;
using Educational.DTO_Models.LectureDto;
using System.Linq.Expressions;

public interface IBaseRepository<T> where T : class
{
        Task AddAsync(T entity);
        Task<T?> GetByIdAsync(int Id);
        Task<T?> FindAsync(Expression<Func<T,bool>> match, string[]? includes = null);
        Task<IEnumerable<T>> GetAllAsync( string[]? includes = null);
        void Update(T entity);
        void Delete(T entity);

}
