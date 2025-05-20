using System.Linq.Expressions;
using Educational.Data;
using Educational.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Educational.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly AppDbContext _context;
       public BaseRepository(AppDbContext Context)
        {
            _context = Context;
        }
        public async Task AddAsync(T entity) => await _context.Set<T>().AddAsync(entity);

        public async Task<T> GetByIdAsync(int Id)
        {
            return await _context.Set<T>().FindAsync(Id);
        }
        public async Task<T> FindAsync(Expression<Func<T,bool>> match, string[]? includes = null)
        {
            IQueryable<T> query = _context.Set<T>();

            if (includes != null)
            {
                foreach (var item in includes)
                {
                    query = query.Include(item);
                }
            }
            return await query.SingleOrDefaultAsync(match);
        }

        public async Task<IEnumerable<T>> GetAllAsync( string[]? includes = null)
        {
            IQueryable<T> query = _context.Set<T>();
            if (includes != null)
            {
                foreach (var item in includes)
                {
                   query = query.Include(item);
                }
            }
            return await query.ToListAsync();
        }
        public void Update(T Entity)
        {
             _context.Set<T>().Update(Entity);
        }
        public void Delete(T Entity)
        {
             _context.Set<T>().Remove(Entity);
        }
    }
}
