using Educational.DTO_Models;
using Educational.Entities;

namespace Educational.Mapper
{
    public static class WeekMapper
    {
        public static Week ToEntity(this Week_Create_Update_Dto WeekDto, int courseId)
        {
            return new Week
            {
                Content = WeekDto.Content,
                WeekNumber = WeekDto.WeekNumber,
                CourseId = courseId
            };
        }
        public static Week_Get_Dto ToReadDto(this Week Week)
        {
            return new Week_Get_Dto
            {
                Id = Week.Id,
                Content = Week.Content,
                WeekNumber = Week.WeekNumber,
            };
        }
        public static Week ToUpdatedEntity(this Week Week, Week_Create_Update_Dto WeekUpdate,int courseId)
        {
            Week.Content = WeekUpdate.Content;
            Week.WeekNumber = WeekUpdate.WeekNumber;
            Week.CourseId = courseId;
            return Week;
        }
        public static IEnumerable<Week_Get_Dto> ToListReadDto(this IEnumerable<Week> Weeks)
        {
            var ToListReadDto = Weeks.Select(w => new Week_Get_Dto
            {
                Id = w.Id,
                Content = w.Content,
                WeekNumber= w.WeekNumber,
            }).ToList();

            return ToListReadDto;
        }
    }
}
