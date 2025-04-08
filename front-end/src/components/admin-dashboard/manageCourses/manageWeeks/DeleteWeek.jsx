import { useContext, useState } from "react";
import { Courses_Context } from "../../../../Contexts/CoursesContext";

const DeleteWeek = () => {
  const { courses } = useContext(Courses_Context);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedWeekId, setSelectedWeekId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Find selected course and get its weeks
  const selectedCourse = courses.find(
    (c) => c.id === parseInt(selectedCourseId)
  );
  const weeks = selectedCourse ? selectedCourse.weeks : [];

  // Handle week deletion
  const handleDelete = async () => {
    if (!selectedCourseId || !selectedWeekId) {
      setMessage("Please select both a course and a week.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this week?")) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:5020/api/courses/${selectedCourseId}/weeks/${selectedWeekId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete week");

      setMessage("Week deleted successfully 🎉!");
      setSelectedWeekId(""); // Reset selection
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Delete Week</h2>

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

        {/* Week Selection (Only if course is selected) */}
        {selectedCourseId && weeks.length > 0 && (
          <select
            className="w-full p-2 mb-4 bg-gray-700 rounded-lg text-white"
            value={selectedWeekId}
            onChange={(e) => setSelectedWeekId(e.target.value)}
          >
            <option value="">Select a Week</option>
            {weeks.map((week) => (
              <option key={week.id} value={week.id}>
                Week {week.weekNumber}
              </option>
            ))}
          </select>
        )}

        {/* Delete Button */}
        {selectedWeekId && (
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
          >
            {loading ? "Deleting..." : "Delete Week"}
          </button>
        )}

        {selectedCourseId && weeks.length === 0 && (
          <p className="text-center text-gray-400">
            No weeks available for this course.
          </p>
        )}
      </div>
    </div>
  );
};

export default DeleteWeek;
