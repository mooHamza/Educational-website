import { useContext, useState, useEffect } from "react";
import { Courses_Context } from "../../../Contexts/CoursesContext";
import { Grades_Context } from "../../../Contexts/GradesContext";

const EditCourse = () => {
  const { grades } = useContext(Grades_Context);
  const { courses } = useContext(Courses_Context);
  const [selectedCourseId, setSelectedCourseId] = useState(""); // Selected course ID
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    gradeId: "",
  });

  const [Grades, setGrades] = useState([]); // List of Grades
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch Grades on component mount
  useEffect(() => {
    if (grades) {
      setGrades(grades);
    }
  }, [grades]);

  // Update form when a course is selected
  useEffect(() => {
    if (selectedCourseId) {
      const selectedCourse = courses.find(
        (c) => c.id === parseInt(selectedCourseId)
      );
      if (selectedCourse) {
        setFormData({
          name: selectedCourse.name,
          description: selectedCourse.description,
          price: selectedCourse.price,
          gradeId: selectedCourse.gradeId,
        });
      }
    }
  }, [selectedCourseId, courses]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated course
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
        `http://localhost:5020/api/courses/${selectedCourseId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update course");

      setMessage("Course updated successfully!");
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Course</h2>

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

        {/* Form for editing course */}
        {selectedCourseId && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Course Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 rounded-lg text-white"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 rounded-lg text-white"
            ></textarea>

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 rounded-lg text-white"
            />

            <select
              name="gradeId"
              value={formData.gradeId}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 rounded-lg text-white"
            >
              <option value="">Select Grade</option>
              {Grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.gradeName}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
            >
              {loading ? "Updating..." : "Update Course"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditCourse;
