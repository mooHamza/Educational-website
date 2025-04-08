import React, { useContext, useEffect, useState } from "react";
import { Courses_Context } from "../../../Contexts/CoursesContext";

const DeleteCourse = () => {
  const { courses } = useContext(Courses_Context);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState("");

  // Sync `myCourses` with `courses` when it updates
  useEffect(() => {
    setMyCourses(courses || []); // Ensure it never starts as undefined
  }, [courses]);

  // Delete a course by ID
  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    setLoading(id); // Set loading to the ID being deleted
    setMessage("");

    try {
      const response = await fetch(`http://localhost:5020/api/courses/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete course");

      setMessage("Course deleted successfully!");
      setMyCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    setLoading(null); // Reset loading state
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Delete a Course</h2>

        {message && <p className="text-center mb-4 text-sm">{message}</p>}

        {myCourses.length === 0 ? (
          <p className="text-center text-gray-400">No courses available.</p>
        ) : (
          <ul className="space-y-3">
            {myCourses.map((course) => (
              <li
                key={course.id}
                className="flex justify-between items-center p-3 bg-gray-700 rounded-lg"
              >
                <span>{course.name}</span>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
                  disabled={loading === course.id}
                >
                  {loading === course.id ? "Deleting..." : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DeleteCourse;
