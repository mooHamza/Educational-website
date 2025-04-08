using Educational.Data;
using Educational.DTO_Models;
using Educational.DTO_Models.CourseDto;
using Educational.DTO_Models.LectureDto;
using Educational.Entities;
using Educational.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

using Educational.DTO_Models.OptionDto;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Primitives;

namespace Educational.Repositories
{
    public class CourseRepository : IcourseRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly AppDbContext _context;

        public CourseRepository(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        public async Task SetCoursesAsync(FullCourse_Create_Dto coursedto)
        {
            var newCourse = new Course
            {
                Name = coursedto.Name,
                Description = coursedto.Description,
                Price = coursedto.Price,
                GradeId = coursedto.GradeId,
                Weeks = coursedto.Weeks?.Select(w => new Week
                {
                    Content = w.Content,
                    WeekNumber = w.WeekNumber,
                    Lectures = w.Lectures?.Select(l => new Lecture
                    {
                        Name = l.Name,

                        Url = ChangeFileToUrl(l.File),
                        Homeworks = l.Homeworks?.Select(h => new Homework
                        {
                            Name = h.Name,
                            Degree = h.Degree,
                            Questions = h.Questions?.Select(Q => new Question
                            {
                                QuestionText = Q.QuestionText,
                                Options = Q.Options.Select(Opt => new Option
                                {
                                    OptionText = Opt.OptionText,
                                    IsCorrect = Opt.IsCorrect,

                                }).ToList()
                            }).ToList()
                        }).ToList()
                    }).ToList()
                }).ToList()
            };
            _context.Courses.Add(newCourse);
            await _context.SaveChangesAsync();
        }

        public async Task CreateCourse(CourseCreate_Dto Course)
        {

            var course = new Course
            {
                Name = Course.Name,
                Description = Course.Description,
                Price = Course.Price,
                GradeId = Course.GradeId,
            };
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

        }
        private string ChangeFileToUrl(IFormFile file)
        {
            if (file == null)
            {
                throw new Exception("no file uploaded");
            }

            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            var FullPath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(FullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return FullPath;
        }


        public async Task<List<CourseGetDto>> GetCoursesAsync()
        {
            var courses = await _context.Courses
                .AsNoTracking()
                .Include(c => c.Grade)
                .Include(c => c.Weeks!)
                      .ThenInclude(w => w.Lectures!)
                          .ThenInclude(l => l.Homeworks!)
                              .ThenInclude(h => h.Questions!)
                                  .ThenInclude(q => q.Options)

                                       .ToListAsync();
            var CoursesDto = courses.Select(course => new CourseGetDto
            {
                Id = course.Id,
                Name = course.Name,
                Description = course.Description,
                GradeName = course.Grade!.GradeName,
                Price = course.Price,
                Weeks = course.Weeks?.Select(W => new Week_Get_Dto
                {
                    Id = W.Id,
                    Content = W.Content,
                    WeekNumber = W.WeekNumber,
                    Lectures = W.Lectures?.Select(l => new Lecture_Get_Dto
                    {
                        Id = l.Id,
                        Name = l.Name,
                        Url = GetUrl(l.Url),
                        Homeworks = l.Homeworks?.Select(h => new Homework_Get_Dto
                        {
                            Id = h.Id,
                            Name = h.Name,
                            Degree = h.Degree,
                            Questions = h.Questions!.Select(q => new Question_Get_Dto
                            {
                                Id = q.Id,
                                QuestionText = q.QuestionText,
                                Options = q.Options.Select(o => new Option_Get_Dto
                                {
                                    Id = o.Id,
                                    OptionText = o.OptionText,
                                    IsCorrect = o.IsCorrect

                                }).ToList()
                            }).ToList()
                        }).ToList()
                    }).ToList()

                }).ToList()


            }).ToList();

            return CoursesDto;
        }

        public async Task EditCourseAsync(Course_Update_Dto newCourse, int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                throw new Exception("Course not found");
            }

            course.Name = newCourse.Name;
            course.Description = newCourse.Description;
            course.Price = newCourse.Price;
            course.GradeId = newCourse.GradeId;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteCourseAsync(int Id)
        {
            var course = await _context.Courses.FindAsync(Id);
            if (course == null)
            {
                throw new KeyNotFoundException($"course with Id {Id} not found");
            }
            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
        }

        private string GetUrl(string filepath)
        {

            var request = _httpContextAccessor.HttpContext.Request;
            var baseUrl = $"{request.Scheme}://{request.Host}{request.PathBase}";
            return $"{baseUrl}/Uploads/{Path.GetFileName(filepath)}";
        }

        /// <summary>
        /// weeks part
        /// </summary>
        /// <param ></param>
        /// <returns></returns>
        /// <exception ></exception>
        public async Task AddWeek(Week_CreateDto week, int CourseId)
        {
            var course = await _context.Courses.FindAsync(CourseId);
            if (course == null)
            {
                throw new KeyNotFoundException($"there is no course with id {CourseId}");
            }
            else
            {

                var Week = new Week
                {
                    Content = week.Content,
                    WeekNumber = week.WeekNumber,
                    Course = course

                };
                course.Weeks.Add(Week);
                await _context.SaveChangesAsync();
            }
        }


        public async Task UpdateWeek(Week_Update_Dto week,int CourseId, int Id)
        {
            var Week = _context.Weeks.Find(Id);

            if (Week == null)
            {
                throw new KeyNotFoundException("week not found");
            }
            else
            {

                Week.Content = week.Content;
                Week.WeekNumber = week.WeekNumber;
                Week.CourseId = CourseId;

                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteWeek(int Id)
        {
            var week = _context.Weeks.Find(Id);
            if (week == null)
            {
                throw new KeyNotFoundException("week not found");
            }
            else
            {
                _context.Weeks.Remove(week);
                await _context.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Lecture part
        /// </summary>
        /// <param ></param>
        /// <returns></returns>
        /// <exception ></exception>
        public async Task AddLecture(Lecture_Create_UpdateDto lecture, int WeekId)
        {
            var newLecture = new Lecture
            {
                Name = lecture.Name,
                Url = ChangeFileToUrl(lecture.File),
                WeekId = WeekId

            };
            _context.Lectures.Add(newLecture);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateLecture(Lecture_Create_UpdateDto lecture, int WeekId, int Id)
        {
            var Lecture = await _context.Lectures.FindAsync(Id);
            if (Lecture == null)
            {
                throw new KeyNotFoundException("lecture not found");
            }

            Lecture.Name = lecture.Name ?? Lecture.Name;
            if (lecture.File != null)
            {
                Lecture.Url = ChangeFileToUrl(lecture.File);
            }
            Lecture.WeekId = WeekId != 0 ? WeekId : Lecture.WeekId;
            await _context.SaveChangesAsync();

        }

        public async Task DeleteLecture(int Id)
        {
            var lecture = await _context.Lectures.FindAsync(Id);

            if (lecture == null)
            {
                throw new KeyNotFoundException("lecture not found");
            }
            _context.Lectures.Remove(lecture);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Homework part
        /// </summary>
        public async Task AddHomeWork(Hw_Create_Dto homeWork, int LectureId)
        {
            var Lecture = await _context.Lectures.FindAsync(LectureId);
            if (Lecture == null)
            {
                throw new KeyNotFoundException("Lecture not found");
            }
            var newHomework = new Homework
            {
                Name = homeWork.Name,
                Degree = homeWork.Degree,
                LectureId = LectureId,
                Questions = homeWork.Questions.Select(q => new Question
                {
                    QuestionText = q.QuestionText,
                    Options = q.Options.Select(o => new Option
                    {
                        OptionText = o.OptionText,
                        IsCorrect = o.IsCorrect
                    }).ToList()
                }).ToList()
            };
            _context.Homeworks.Add(newHomework);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateHomeWork(Hw_Create_Dto _HomeWork,int HomeworkId)
        {
            var homework = await _context.Homeworks.FindAsync(HomeworkId);
            if (homework == null)
            {
                throw new KeyNotFoundException("homework not found");
            }
            homework.Name = _HomeWork.Name;
            homework.Degree = _HomeWork.Degree;

            homework.Questions.Clear();
            homework.Questions = _HomeWork.Questions.Select(q => new Question
            {
                QuestionText = q.QuestionText,
                Options = q.Options.Select(o => new Option
                {
                    OptionText = o.OptionText,
                    IsCorrect = o.IsCorrect
                }).ToList()
            }).ToList();
            await _context.SaveChangesAsync();

        }

        public async Task DeleteHomework(int Id)
        {
            var homework = await _context.Homeworks.FindAsync(Id);
            if (homework == null)
            {
                throw new KeyNotFoundException("homework not found");
            }
            _context.Homeworks.Remove(homework);
            await _context.SaveChangesAsync();
        }


    }
}
