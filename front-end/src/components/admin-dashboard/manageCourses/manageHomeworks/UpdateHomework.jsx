import { useContext, useState, useEffect } from "react";
import { Courses_Context } from "../../../../Contexts/CoursesContext";

const EditHomework = () => {
  const { courses } = useContext(Courses_Context);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedWeekId, setSelectedWeekId] = useState("");
  const [selectedLectureId, setSelectedLectureId] = useState("");
  const [selectedHomeworkId, setSelectedHomeworkId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    degree:"",
    questions: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Get weeks, lectures, and homeworks
  const selectedCourse = courses.find(
    (c) => c.id === parseInt(selectedCourseId)
  );
  const weeks = selectedCourse ? selectedCourse.weeks : [];
  const selectedWeek = weeks.find((w) => w.id === parseInt(selectedWeekId));
  const lectures = selectedWeek ? selectedWeek.lectures : [];
  const selectedLecture = lectures.find(
    (l) => l.id === parseInt(selectedLectureId)
  );
  const homeworks = selectedLecture ? selectedLecture.homeworks : [];

  // Prefill form when homework is selected
  useEffect(() => {
    if (selectedHomeworkId) {
      const selectedHomework = homeworks.find(
        (h) => h.id === parseInt(selectedHomeworkId)
      );
      if (selectedHomework) {
        setFormData({
          name: selectedHomework.name,
          degree:selectedHomework.degree,
          questions: selectedHomework.questions.map((q) => ({
            questionText: q.questionText,
            options: q.options.map((o) => ({
              optionText: o.optionText,
              isCorrect: o.isCorrect,
            })),
          })),
        });
      }
    }
  }, [selectedHomeworkId, homeworks]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add Question
  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { questionText: "", options: [{ optionText: "", isCorrect: false }] },
      ],
    });
  };

  // Delete Question
  const deleteQuestion = (index) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions.splice(index, 1);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Handle question text change
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index].questionText = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Add Option
  const addOption = (qIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options.push({ optionText: "", isCorrect: false });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Delete Option
  const deleteOption = (qIndex, oIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options.splice(oIndex, 1);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Handle option change
  const handleOptionChange = (qIndex, oIndex, value, isCorrect = false) => {
    const updatedQuestions = [...formData.questions];
    if (isCorrect) {
      updatedQuestions[qIndex].options[oIndex].isCorrect = value;
    } else {
      updatedQuestions[qIndex].options[oIndex].optionText = value;
    }
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !selectedCourseId ||
      !selectedWeekId ||
      !selectedLectureId ||
      !selectedHomeworkId ||
      !formData.name ||
      !formData.degree
    ) {
      setMessage("All fields are required!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:5020/api/courses/${selectedCourseId}/weeks/${selectedWeekId}/lectures/${selectedLectureId}/homeworks/${selectedHomeworkId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update homework");
      setMessage("Homework updated successfully 🎉!");
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Homework</h2>

        {message && <p className="text-center text-sm mb-4">{message}</p>}

        {/* Select Inputs */}
        <select
          className="w-full p-2 mb-4 bg-gray-700 rounded-lg"
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

        {selectedCourseId && weeks.length > 0 && (
          <select
            className="w-full p-2 mb-4 bg-gray-700 rounded-lg"
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

        {selectedWeekId && lectures.length > 0 && (
          <select
            className="w-full p-2 mb-4 bg-gray-700 rounded-lg"
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

        {selectedLectureId && homeworks.length > 0 && (
          <select
            className="w-full p-2 mb-4 bg-gray-700 rounded-lg"
            value={selectedHomeworkId}
            onChange={(e) => setSelectedHomeworkId(e.target.value)}
          >
            <option value="">Select Homework</option>
            {homeworks.map((homework) => (
              <option key={homework.id} value={homework.id}>
                {homework.name}
              </option>
            ))}
          </select>
        )}

        {selectedHomeworkId && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Homework Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 rounded-lg"
            />
            <input
              type="text"
              name="degree"
              placeholder="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 rounded-lg"
            />

            {formData.questions.map((question, qIndex) => (
              <div key={qIndex} className="p-3 bg-gray-700 rounded-lg">
                <input
                  type="text"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  className="w-full p-2 mb-2 bg-gray-600 rounded-lg"
                />
                <button
                  onClick={() => deleteQuestion(qIndex)}
                  className="text-red-500 text-sm"
                >
                  Delete Question
                </button>

                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center mt-2">
                    <input
                      type="text"
                      value={option.optionText}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      className="flex-1 p-2 bg-gray-600 rounded-lg"
                    />
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={(e) =>
                        handleOptionChange(
                          qIndex,
                          oIndex,
                          e.target.checked,
                          true
                        )
                      }
                      className="ml-2"
                    />
                    <button
                      onClick={() => deleteOption(qIndex, oIndex)}
                      className="text-red-500 ml-2"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addOption(qIndex)}
                  className="text-blue-400 mt-2"
                >
                  + Add Option
                </button>
              </div>
            ))}

            <button onClick={addQuestion} className="text-green-400">
              + Add Question
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 p-2 rounded-lg"
            >
              {loading ? "Updating..." : "Update Homework"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditHomework;
