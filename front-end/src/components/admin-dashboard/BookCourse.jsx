import { useState, useContext } from "react";
import { Courses_Context } from "../../Contexts/CoursesContext";
import { User_Context } from "../../Contexts/UserContext";

const BookCourse = () => {
  const { courses } = useContext(Courses_Context);
  const { users } = useContext(User_Context);
  console.log(users);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle booking
  const handleBookCourse = async () => {
    if (!selectedUserId || !selectedCourseId) {
      setMessage("Please select a user and a course");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:5020/api/Users/${selectedUserId}/courses/${selectedCourseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to book course");

      setMessage("Course booked successfully 🎉!");
    } catch (error) {
      setMessage("Error booking course");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Book a Course</h2>

        {message && <p className="text-center text-sm mb-4">{message}</p>}

        {/* User Selection */}
        <select
          className="w-full p-2 mb-4 bg-gray-700 rounded-lg text-white"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Select a User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>

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

        {/* Book Button */}
        <button
          onClick={handleBookCourse}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
        >
          {loading ? "Booking..." : "Book Course"}
        </button>
      </div>
    </div>
  );
};

export default BookCourse;
