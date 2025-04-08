import React, { useContext, useState } from "react";
import { Grades_Context } from "../../../Contexts/GradesContext";

const Add_Course = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    gradeId: "",
  });
  const { grades } = useContext(Grades_Context);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5020/api/Courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          gradeId: formData.gradeId,
        }),
      });

      if (!response.ok) throw new Error("Failed to create course");

      setMessage("Course created successfully! 🎉");
      setFormData({ name: "", description: "", price: "", gradeId: "" });
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    setLoading(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create a New Course
        </h2>

        {message && <p className="text-center mb-4 text-sm">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Course Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="gradeId" className="block text-sm">
              Grade ID
            </label>
            <select
              name="gradeId"
              id="gradeId"
              value={formData.gradeId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>select grade</option>
              {grades?.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.gradeName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-gray-600"
          >
            {loading ? "Creating..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add_Course;
