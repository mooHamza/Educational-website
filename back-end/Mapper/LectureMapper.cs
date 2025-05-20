using Educational.DTO_Models.CourseDto;
using Educational.DTO_Models.LectureDto;
using Educational.DTO_Models.OptionDto;
using Educational.DTO_Models;
using Educational.Entities;

namespace Educational.Mapper
{
    public class LectureMapper
    {
        public Lecture ToEntity(Lecture_Create_Update_Dto LectureDto,int WeekId)
        {
            return new Lecture
            {
                Name = LectureDto.Name,
                Url = ChangeFileToUrl(LectureDto.File),
                WeekId = WeekId
            };
        }
        public Lecture ToUpdatedEntity(Lecture Lecture, Lecture_Create_Update_Dto LectureUpdate,int WeekId)
        {
            Lecture.Name = LectureUpdate.Name ?? Lecture.Name;
            if (LectureUpdate.File != null)
            {
                Lecture.Url = ChangeFileToUrl(LectureUpdate.File);
            }
            Lecture.WeekId = WeekId != 0 ? WeekId : Lecture.WeekId;
            return Lecture;
        }
        private static string ChangeFileToUrl(IFormFile file)
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


    }
}
