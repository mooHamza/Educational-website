using Educational.Data;
using Educational.DTO_Models;
using Educational.DTO_Models.CourseDto;
using Educational.Entities;
using Educational.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Educational.Repositories
{
    public class CourseRepository(AppDbContext context) : BaseRepository<Course>(context), ICourseRepository
    {

        public async Task<IEnumerable<Course>> GetAllCoursesAsync()
        {
            var courses = await _context.Set<Course>()
               .AsNoTracking()
               .Include(c => c.Grade)
               .Include(c => c.Weeks)
                     .ThenInclude(w => w.Lectures)
                         .ThenInclude(l => l.Homeworks)
                             .ThenInclude(h => h.Questions)
                                 .ThenInclude(q => q.Options)

               .ToListAsync();
            return courses;
        }
        public async Task<Course> GetCourseByIdAsync(int Id)
        {
            var course = await _context.Set<Course>()
                                 .Include(c => c.Grade)
                                 .Include(c => c.Weeks)
                                    .ThenInclude(w => w.Lectures)
                                        .ThenInclude(l => l.Homeworks)
                                            .ThenInclude(h => h.Questions)
                                                .ThenInclude(q => q.Options)
                        .FirstOrDefaultAsync(c=>c.Id == Id);
            return course!;
        }

        //public async Task SetCoursesAsync(FullCourse_Create_Dto coursedto)
        //{
        //    var newCourse = new Course
        //    {
        //        Name = coursedto.Name,
        //        Description = coursedto.Description,
        //        Price = coursedto.Price,
        //        GradeId = coursedto.GradeId,
        //        Weeks = coursedto.Weeks?.Select(w => new Week
        //        {
        //            Content = w.Content,
        //            WeekNumber = w.WeekNumber,
        //            Lectures = w.Lectures?.Select(l => new Lecture
        //            {
        //                Name = l.Name,

        //                Url = ChangeFileToUrl(l.File),
        //                Homeworks = l.Homeworks?.Select(h => new Homework
        //                {
        //                    Name = h.Name,
        //                    Degree = h.Degree,
        //                    Questions = h.Questions?.Select(Q => new Question
        //                    {
        //                        QuestionText = Q.QuestionText,
        //                        Options = Q.Options.Select(Opt => new Option
        //                        {
        //                            OptionText = Opt.OptionText,
        //                            IsCorrect = Opt.IsCorrect,

        //                        }).ToList()
        //                    }).ToList()
        //                }).ToList()
        //            }).ToList()
        //        }).ToList()
        //    };
        //    _context.Courses.Add(newCourse);
        //    await _context.SaveChangesAsync();
        //}



    }
}
