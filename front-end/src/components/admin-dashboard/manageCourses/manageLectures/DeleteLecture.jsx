import { useContext, useState } from "react";
import { Courses_Context } from "../../../../Contexts/CoursesContext";

const DeleteLecture = () => {
  const { courses, setCourses } = useContext(Courses_Context);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedWeekId, setSelectedWeekId] = useState("");
  const [selectedLectureId, setSelectedLectureId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Get weeks & lectures from selected course
  const selectedCourse = courses.find(
    (c) => c.id === parseInt(selectedCourseId)
  );
  const weeks = selectedCourse ? selectedCourse.weeks : [];
  const selectedWeek = weeks.find((w) => w.id === parseInt(selectedWeekId));
  const lectures = selectedWeek ? selectedWeek.lectures : [];

  // Handle delete lecture
  const handleDelete = async () => {
    if (!selectedCourseId || !selectedWeekId || !selectedLectureId) {
      setMessage("Please select a course, week, and lecture.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:5020/api/courses/${selectedCourseId}/weeks/${selectedWeekId}/lectures/${selectedLectureId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete lecture");

      setMessage("Lecture deleted successfully!");

      // Update local state
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === parseInt(selectedCourseId)
            ? {
                ...course,
                weeks: course.weeks.map((week) =>
                  week.id === parseInt(selectedWeekId)
                    ? {
                        ...week,
                        lectures: week.lectures.filter(
                          (lecture) => lecture.id !== parseInt(selectedLectureId)
                        ),
                      }
                    : week
                ),
              }
            : course
        )
      );

      setSelectedLectureId("");
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Delete Lecture</h2>

        {message && <p className="text-center text-sm mb-4">{message}</p>}

        {/* Course Selection */}
        <select
          className="w-full p-2 mb-4 bg-gray-700 rounded-lg text-white"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option value="">Select a Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        {/* Week Selection */}
        {selectedCourseId && weeks.length > 0 && (
          <select
            className="w-full p-2 mb-4 bg-gray-700 rounded-lg text-white"
            value={selectedWeekId}
            onChange={(e) => setSelectedWeekId(e.target.value)}
          >
            <option value="">Select a Week</option>
            {weeks.map((week) => (
              <option key={week.id} value={week.id}>
                Week {week.weekNumber} - {week.content}
              </option>
            ))}
          </select>
        )}

        {/* Lecture Selection */}
        {selectedWeekId && lectures.length > 0 && (
          <select
            className="w-full p-2 mb-4 bg-gray-700 rounded-lg text-white"
            value={selectedLectureId}
            onChange={(e) => setSelectedLectureId(e.target.value)}
          >
            <option value="">Select a Lecture</option>
            {lectures.map((lecture) => (
              <option key={lecture.id} value={lecture.id}>
                {lecture.name}
              </option>
            ))}
          </select>
        )}

        {/* Delete Button */}
        {selectedLectureId && (
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
          >
            {loading ? "Deleting..." : "Delete Lecture"}
          </button>
        )}

        {selectedWeekId && lectures.length === 0 && (
          <p className="text-center text-gray-400">
            No lectures available for this week.
          </p>
        )}
      </div>
    </div>
  );
};

export default DeleteLecture;
