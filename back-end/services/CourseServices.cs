using Educational.DTO_Models;
using Educational.DTO_Models.CourseDto;
using Educational.DTO_Models.LectureDto;
using Educational.Entities;
using Educational.Repositories;
using Educational.Repositories.Interfaces;

namespace Educational.services
{
    public class CourseServices(IcourseRepository _repository) 
    {
        public async Task SetCoursesAsync(FullCourse_Create_Dto coursedto)
        {
            await _repository.SetCoursesAsync(coursedto);
        }

        public async Task CreateCourseAsync(CourseCreate_Dto course)
        {
             await _repository.CreateCourse(course);
        }

        public async Task<List<CourseGetDto>> GetCourses()
        {
            return await _repository.GetCoursesAsync();
        }

        public async Task UpdateCourseAsync(Course_Update_Dto UpdatedCourse,int Id) 
        {
            await _repository.EditCourseAsync(UpdatedCourse, Id);
        }

        public async Task DeleteCourseAsync(int Id)
        {
            await _repository.DeleteCourseAsync(Id);
        }
        /// <summary>
        /// Week Section
        /// </summary>
        /// <param ></param>
        /// <returns></returns>
        public async Task AddWeekAsync(Week_CreateDto week,int CourseId)
        {
           await _repository.AddWeek(week, CourseId);
        }

        public async Task UpdateWeekAsync(Week_Update_Dto Week,int CourseId, int Id)
        {
            await _repository.UpdateWeek(Week, CourseId, Id);
        }

        public async Task DeleteWeekAsync(int Id)
        {
            await _repository.DeleteWeek(Id);
        }
        /// <summary>
        /// Lecture Section
        /// </summary>
        /// <param ></param>
        /// <returns></returns>
        public async Task AddLectureAsync(Lecture_Create_UpdateDto lecture,int WeekId)
        {
            await _repository.AddLecture(lecture, WeekId);
        }
        public async Task UpdateLectureAsync(Lecture_Create_UpdateDto lecture, int WeekId,int Id)
        {
            await _repository.UpdateLecture(lecture, WeekId, Id);
        }
        public async Task DeleteLectureAsync(int Id)
        {
            await _repository.DeleteLecture(Id);
        }
        /// <summary>
        /// homework Section
        /// </summary>
        /// <param ></param>
        /// <returns></returns>
        public async Task AddHomeWork(Hw_Create_Dto homeWork, int LectureId)
        {
            await _repository.AddHomeWork(homeWork, LectureId); 
        }

        public async Task UpdateHomeWork(Hw_Create_Dto HomeWork,int HomeworkId)
        {
            await _repository.UpdateHomeWork(HomeWork, HomeworkId);
        }

        public async Task DeleteHomework(int Id)
        {
            await _repository.DeleteHomework(Id);
        }


    }
}
