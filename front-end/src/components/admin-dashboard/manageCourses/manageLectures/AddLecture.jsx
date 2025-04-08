import { useContext, useState } from "react";
import { Courses_Context } from "../../../../Contexts/CoursesContext";

const AddLecture = () => {
  const { courses } = useContext(Courses_Context);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedWeekId, setSelectedWeekId] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Get weeks from selected course
  const selectedCourse = courses.find((c) => c.id === parseInt(selectedCourseId));
  const weeks = selectedCourse ? selectedCourse.weeks : [];

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle lecture submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourseId || !selectedWeekId || !lectureName || !file) {
      setMessage("All fields are required!");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("Name", lectureName);
    formData.append("File", file);

    try {
      const res = await fetch(
        `http://localhost:5020/api/courses/${selectedCourseId}/weeks/${selectedWeekId}/lectures`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to add lecture");

      setMessage("Lecture added successfully 🎉!");
      setLectureName("");
      setFile(null);
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Lecture</h2>

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
                Week {week.weekNumber} - {week.content}
              </option>
            ))}
          </select>
        )}

        {/* Lecture Form */}
        {selectedWeekId && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Lecture Name"
              value={lectureName}
              onChange={(e) => setLectureName(e.target.value)}
              required
              className="w-full p-2 bg-gray-700 rounded-lg text-white"
            />

            <input
              type="file"
              accept="*"
              onChange={handleFileChange}
              required
              className="w-full p-2 bg-gray-700 rounded-lg text-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
            >
              {loading ? "Uploading..." : "Add Lecture"}
            </button>
          </form>
        )}

        {selectedCourseId && weeks.length === 0 && (
          <p className="text-center text-gray-400">No weeks available for this course.</p>
        )}
      </div>
    </div>
  );
};

export default AddLecture;
