import { useContext, useState } from "react";
import { Courses_Context } from "../../../../Contexts/CoursesContext";

const AddWeek = () => {
  const { courses } = useContext(Courses_Context); // Get courses from context
  const [selectedCourseId, setSelectedCourseId] = useState(""); // Store selected course ID
  const [formData, setFormData] = useState({
    weekNumber: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "weekNumber" ? parseInt(value) : value,
    });
  };

  // Handle course selection
  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourseId) {
      setMessage("Please select a course first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:5020/api/courses/${selectedCourseId}/weeks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to add week");

      setMessage("Week added successfully 🎉!");
      setFormData({ weekNumber: "", content: "" }); // Reset form
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Add a Week</h2>

        {message && <p className="text-center text-sm mb-4">{message}</p>}

        {/* Course Selection */}
        <select
          className="w-full p-2 mb-4 bg-gray-700 rounded-lg text-white"
          value={selectedCourseId}
          onChange={handleCourseChange}
        >
          <option value="">Select a Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        {/* Form */}
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
            {loading ? "Adding..." : "Add Week"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWeek;
