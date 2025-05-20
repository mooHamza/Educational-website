namespace Educational.Repositories.Interfaces;


using Educational.Entities;
using Educational.DTO_Models;
using Educational.DTO_Models.CourseDto;
using Educational.DTO_Models.LectureDto;

public interface ICourseRepository : IBaseRepository<Course>
{
    //Task SetCoursesAsync(FullCourse_Create_Dto course);

    Task<IEnumerable<Course>> GetAllCoursesAsync();
    Task<Course> GetCourseByIdAsync(int Id);

  


}

