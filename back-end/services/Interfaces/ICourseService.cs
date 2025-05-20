using Educational.DTO_Models.CourseDto;
using Educational.DTO_Models.LectureDto;
using Educational.DTO_Models;
using Educational.Entities;
using System.Linq.Expressions;

namespace Educational.services.Interfaces
{
    public interface ICourseService
    {
        //Task SetCoursesAsync(FullCourse_Create_Dto coursedto);


        Task CreateCourseAsync(Course_Create_Update_Dto course);
        Task<CourseGetDto> GetCourseByIdAsync(int Id);

        Task<IEnumerable<CourseGetDto>> GetAllCoursesAsync();

         Task UpdateCourseAsync(Course_Create_Update_Dto UpdatedCourse, int Id);

        Task DeleteCourseAsync(int Id);
        /// <summary>
        /// Week Section
        /// </summary>
        /// <param ></param>
        /// <returns></returns>
        Task AddWeekAsync(Week_Create_Update_Dto week, int CourseId);

        Task UpdateWeekAsync(Week_Create_Update_Dto Week, int CourseId, int Id);

        Task DeleteWeekAsync(int Id);

        ///// <summary>
        ///// Lecture Section
        ///// </summary>
        ///// <param ></param>
        ///// <returns></returns>
        Task AddLectureAsync(Lecture_Create_Update_Dto lecture, int WeekId);
        Task UpdateLectureAsync(Lecture_Create_Update_Dto lecture, int WeekId, int Id);
        Task DeleteLectureAsync(int Id);
        ///// <summary>
        ///// homework Section
        ///// </summary>
        ///// <param ></param>
        ///// <returns></returns>
        Task AddHomeWorkAsync(Homework_Create_Update_Dto homeWork, int LectureId);

        Task UpdateHomeWorkAsync(Homework_Create_Update_Dto HomeWork, int HomeworkId);

        Task DeleteHomeworkAsync(int Id);
    }
}
