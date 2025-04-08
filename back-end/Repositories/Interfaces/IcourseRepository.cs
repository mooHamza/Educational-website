namespace Educational.Repositories.Interfaces;


using Educational.Entities;
using Educational.DTO_Models;
using Educational.DTO_Models.CourseDto;
using Educational.DTO_Models.LectureDto;

public interface IcourseRepository
{
    Task SetCoursesAsync(FullCourse_Create_Dto course);
    Task CreateCourse(CourseCreate_Dto Course);
    Task<List<CourseGetDto>> GetCoursesAsync();

    Task EditCourseAsync(Course_Update_Dto newCouese, int id);
    Task DeleteCourseAsync(int Id);

    /// <summary>
    /// week part
    /// </summary>
    public Task AddWeek(Week_CreateDto week, int CourseId);
    public Task UpdateWeek(Week_Update_Dto week,int CourseId, int Id);
    public Task DeleteWeek(int Id);
    /// <summary>
    /// Lectures part
    /// </summary>
    
    public Task AddLecture(Lecture_Create_UpdateDto lecture,int WeekId);
    public Task UpdateLecture(Lecture_Create_UpdateDto lecture,int WeekId, int Id);

    public Task DeleteLecture(int Id);

    /// <summary>
    /// Homework part
    /// </summary>

    public Task AddHomeWork(Hw_Create_Dto HomeWork, int QuestionId);

    public Task UpdateHomeWork(Hw_Create_Dto HomeWork,int HomeworkId);

    public Task DeleteHomework(int Id);


}

