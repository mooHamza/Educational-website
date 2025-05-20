using Educational.DTO_Models;
using Educational.DTO_Models.CourseDto;
using Educational.DTO_Models.LectureDto;
using Educational.DTO_Models.OptionDto;
using Educational.Entities;
using System.IO;
namespace Educational.Mapper
{
    public class CourseMapper
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CourseMapper(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public  Course ToEntity( Course_Create_Update_Dto CourseDto)
        {
            return new Course
            {
                Description = CourseDto.Description,
                Name = CourseDto.Name,
                Price = CourseDto.Price,
                GradeId = CourseDto.GradeId,
            };
        }
        public  CourseGetDto ToReadDto( Course Course)
        {
            return new CourseGetDto
            {
                Id = Course.Id,
                Name = Course.Name,
                Description = Course.Description,
                Price = Course.Price,
                GradeName = Course.Grade.GradeName,
                Weeks = Course.Weeks?.Select(w=>new Week_Get_Dto
                {
                    Id=w.Id,
                    Content = w.Content,
                    WeekNumber = w.WeekNumber,
                    Lectures = w.Lectures?.Select(l=>new Lecture_Get_Dto
                    { 
                        Id = l.Id,
                        Name = l.Name,
                        Url = l.Url,
                        Homeworks = l.Homeworks?.Select(h=>new Homework_Get_Dto
                        {
                            Id = h.Id,
                            Name=h.Name,
                            Degree = h.Degree,
                            Questions = h.Questions.Select(q=>new Question_Get_Dto
                            {
                                Id = q.Id, 
                                QuestionText = q.QuestionText,
                                Options = q.Options.Select(o=>new Option_Get_Dto
                                {
                                    Id = o.Id,
                                    OptionText = o.OptionText,
                                    IsCorrect = o.IsCorrect,
                                    
                                }).ToList()
                            }).ToList()
                        }).ToList()
                    }).ToList()
                
                }).ToList()

            };
        }
        public  IEnumerable<CourseGetDto> ToListReadDto( IEnumerable<Course> courses)
        {
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
        public  Course ToUpdatedEntity( Course Course, Course_Create_Update_Dto CourseUpdate)
        {
            Course.Name = CourseUpdate.Name;
            Course.Description = CourseUpdate.Description;
            Course.Price = CourseUpdate.Price;
            Course.GradeId = CourseUpdate.GradeId;
            return Course;
        }
    
        private string GetUrl(string filepath)
        {

            var request = _httpContextAccessor.HttpContext.Request;
            var baseUrl = $"{request.Scheme}://{request.Host}{request.PathBase}";
            return $"{baseUrl}/Uploads/{Path.GetFileName(filepath)}";
        }
    }
}
