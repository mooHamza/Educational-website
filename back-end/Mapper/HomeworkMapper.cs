using Educational.DTO_Models;
using Educational.Entities;

namespace Educational.Mapper
{
    public class HomeworkMapper
    {
        public Homework ToEntity(Homework_Create_Update_Dto HomeworkDto, int LectureId)
        {
            return new Homework
            {
                Name = HomeworkDto.Name,
                Degree = HomeworkDto.Degree,
                LectureId = LectureId,
                Questions = HomeworkDto.Questions.Select(q => new Question
                {
                    QuestionText = q.QuestionText,
                    Options = q.Options.Select(o => new Option
                    {
                        OptionText = o.OptionText,
                        IsCorrect = o.IsCorrect
                    }).ToList()
                }).ToList()
            };
        }
        public Homework ToUpdatedEntity(Homework Homework, Homework_Create_Update_Dto updatedHomeWork)
        {
            Homework.Name = updatedHomeWork.Name;
            Homework.Degree = updatedHomeWork.Degree;

            Homework.Questions.Clear();
            Homework.Questions = updatedHomeWork.Questions.Select(q => new Question
            {
                QuestionText = q.QuestionText,
                Options = q.Options.Select(o => new Option
                {
                    OptionText = o.OptionText,
                    IsCorrect = o.IsCorrect
                }).ToList()
            }).ToList();
            return Homework;
        }
    }
}
