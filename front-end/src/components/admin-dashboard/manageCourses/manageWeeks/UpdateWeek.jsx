import { useContext, useState, useEffect } from "react";
import { Courses_Context } from "../../../../Contexts/CoursesContext";

const UpdateWeek = () => {
  const { courses } = useContext(Courses_Context);

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedWeekId, setSelectedWeekId] = useState("");
  const [weeks, setWeeks] = useState([]);

  const [formData, setFormData] = useState({
    weekNumber: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Filter weeks when a course is selected
  useEffect(() => {
    if (selectedCourseId) {
      const course = courses.find((course) => course.id == selectedCourseId);
      console.log(course);
      setWeeks(course.weeks);
    } else {
      setWeeks([]);
    }
    setSelectedWeekId("");
  }, [selectedCourseId, courses]);

  // Load week data into form when a week is selected
  useEffect(() => {
    if (selectedWeekId && weeks) {
      const selectedWeek = weeks.find((w) => w.id === parseInt(selectedWeekId));
      if (selectedWeek) {
        setFormData({
          weekNumber: selectedWeek.weekNumber,
          content: selectedWeek.content,
        });
      }
    }
  }, [selectedWeekId, weeks]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourseId || !selectedWeekId) {
      setMessage("Please select both a course and a week.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:5020/api/courses/${selectedCourseId}/weeks/${selectedWeekId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update week");

      setMessage("Week updated successfully 🎉!");
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Week</h2>

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
        {selectedCourseId && (
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

        {/* Form for updating the week */}
        {selectedWeekId && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              name="weekNumber"
              placeholder="Week Number"
              value={formData.weekNumber}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 rounded-lg text-white"
            />

            <textarea
              name="content"
              placeholder="Week Content"
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 rounded-lg text-white"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
            >
              {loading ? "Updating..." : "Update Week"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateWeek;
