using Educational.Data;
using Educational.DTO_Models;
using Educational.DTO_Models.CourseDto;
using Educational.DTO_Models.LectureDto;
using Educational.DTO_Models.OptionDto;
using Educational.Entities;
using Educational.Mapper;
using Microsoft.EntityFrameworkCore;

using Educational.Repositories;
using Educational.Repositories.Interfaces;
using Educational.services.Interfaces;
using Educational.Exceptions;

namespace Educational.services
{
    public class CourseServices(
        AppDbContext _context,
        ICourseRepository _courseRepository,
        IBaseRepository<Week> _WeekRepository,
        IBaseRepository<Lecture> _LectureRepository,
        IBaseRepository<Homework> _HomeworkRepository,
        CourseMapper _CourseMapper,
        LectureMapper _LectureMapper,
         HomeworkMapper _HomeworkMapper

        ) : ICourseService
    {

        public async Task CreateCourseAsync(Course_Create_Update_Dto courseCreate)
        {
            var course = _CourseMapper.ToEntity(courseCreate);
             await _courseRepository.AddAsync(course);
            await _context.SaveChangesAsync();
        }

        public async Task<CourseGetDto> GetCourseByIdAsync(int Id)
        {
            var course = await _courseRepository.GetCourseByIdAsync(Id)
                        ?? throw new EntityNotFoundException(nameof(Course),Id);

            var courseReadDto = _CourseMapper.ToReadDto(course);
            return courseReadDto;
        }

        public async Task<IEnumerable<CourseGetDto>> GetAllCoursesAsync()
        {
            var courses = await _courseRepository.GetAllCoursesAsync();
           var CoursesDto =  _CourseMapper.ToListReadDto(courses);
            return CoursesDto;
        }
        public async Task UpdateCourseAsync(Course_Create_Update_Dto UpdatedCoursedto, int Id) 
        {
            var course = await _courseRepository.GetByIdAsync(Id)
                        ?? throw new EntityNotFoundException(nameof(Course), Id);

            var updatedCourse = _CourseMapper.ToUpdatedEntity(course, UpdatedCoursedto);
            _courseRepository.Update(updatedCourse);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCourseAsync(int Id)
        {
            var course = await _courseRepository.GetByIdAsync(Id)
                        ?? throw new EntityNotFoundException(nameof(Course), Id);

            _courseRepository.Delete(course);
            await _context.SaveChangesAsync();
        }
         
        /// //////////////////
        /// 
        /// Week Section  ///
        /// ////////////////
        public async Task AddWeekAsync(Week_Create_Update_Dto weekCreatedto, int CourseId)
        {
             _ = await _courseRepository.GetByIdAsync(CourseId)
                        ?? throw new EntityNotFoundException(nameof(Course), CourseId);

            var newWeek = weekCreatedto.ToEntity(CourseId);
            await _WeekRepository.AddAsync(newWeek);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateWeekAsync(Week_Create_Update_Dto WeekUpdatedto, int CourseId, int Id)
        {
            var week = await _WeekRepository.GetByIdAsync(Id)
                        ?? throw new EntityNotFoundException(nameof(Week), Id);

            week.ToUpdatedEntity(WeekUpdatedto,CourseId);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteWeekAsync(int Id)
        { 
            var week = await _WeekRepository.GetByIdAsync(Id)
                 ?? throw new EntityNotFoundException(nameof(Week), Id);
       
             _WeekRepository.Delete(week);
            await _context.SaveChangesAsync();
        }

        ////// //////////////////
        ///                   //
        /// Lecture Section  ///
        /// ////////////////////
        public async Task AddLectureAsync(Lecture_Create_Update_Dto lecture, int WeekId)

        {
            var newLecture = _LectureMapper.ToEntity(lecture, WeekId);
            await _LectureRepository.AddAsync(newLecture);
            await _context.SaveChangesAsync();
        }
       
        public async Task UpdateLectureAsync(Lecture_Create_Update_Dto updatedLecture, int WeekId, int Id)
        {
            var lecture = await _LectureRepository.GetByIdAsync(Id)
                        ?? throw new EntityNotFoundException(nameof(Lecture), Id);

            var updated_Lecture = _LectureMapper.ToUpdatedEntity(lecture,updatedLecture, WeekId);
            _LectureRepository.Update(updated_Lecture);
            await _context.SaveChangesAsync();

        }
       
        public async Task DeleteLectureAsync(int Id)
        {
            var lecture = await _LectureRepository.GetByIdAsync(Id)
                    ?? throw new EntityNotFoundException(nameof(Lecture), Id);


            _LectureRepository.Delete(lecture);
            await _context.SaveChangesAsync();
        }

        /// ////// //////////////////
        ///                   //
        /// homework Section  ///
        /// ////////////////////

        public async Task AddHomeWorkAsync(Homework_Create_Update_Dto homeWork, int LectureId)
        {
            _ = await _LectureRepository.GetByIdAsync(LectureId)
                  ?? throw new EntityNotFoundException(nameof(Lecture), LectureId);

            var newHomework = _HomeworkMapper.ToEntity(homeWork, LectureId);
            await _HomeworkRepository.AddAsync(newHomework);
            await _context.SaveChangesAsync();
        }

  
        public async Task UpdateHomeWorkAsync(Homework_Create_Update_Dto updatedHomeWork, int HomeworkId)
        {
            var homework = await _HomeworkRepository.GetByIdAsync(HomeworkId)
                ?? throw new EntityNotFoundException(nameof(Homework),HomeworkId);

            var updated_homework = _HomeworkMapper.ToUpdatedEntity(homework, updatedHomeWork);
            _HomeworkRepository.Update(updated_homework);
            await _context.SaveChangesAsync();

        }

        public async Task DeleteHomeworkAsync(int Id)
        {
            var homework = await _HomeworkRepository.GetByIdAsync(Id)
                ?? throw new EntityNotFoundException(nameof(Homework), Id);

            _HomeworkRepository.Delete(homework);
            await _context.SaveChangesAsync();
        }



    }
}
