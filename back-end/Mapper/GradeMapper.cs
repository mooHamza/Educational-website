using Educational.Entities;

namespace Educational.Mapper
{
    public static class GradeMapper
    {
        public static Grade ToEntity(this Grade_Create_Update_Dto GradeDto)
        {
            return new Grade
            {
                GradeName = GradeDto.GradeName
            };
        }
        public static Grade_Get_Dto ToReadDto(this Grade Grade)
        {
            return new Grade_Get_Dto
            {
                Id = Grade.Id,
                GradeName = Grade.GradeName
            };
        }
        public static Grade ToUpdatedEntity(this Grade Grade,Grade_Create_Update_Dto GradeUpdate)
        {
            Grade.GradeName = GradeUpdate.GradeName;
            return Grade;
        }
        public static IEnumerable<Grade_Get_Dto> ToListReadDto(this IEnumerable<Grade> Grades)
        {
            var ToListReadDto = Grades.Select(g => new Grade_Get_Dto
            {
                Id = g.Id,
                GradeName = g.GradeName,
            }).ToList();

            return ToListReadDto;
        }
    }
}
