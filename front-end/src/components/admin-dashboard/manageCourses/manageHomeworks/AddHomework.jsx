import { useContext, useState } from "react";
import { Courses_Context } from "../../../../Contexts/CoursesContext";

const AddHomework = () => {
  const { courses } = useContext(Courses_Context);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedWeekId, setSelectedWeekId] = useState("");
  const [selectedLectureId, setSelectedLectureId] = useState("");

  const [homework, setHomework] = useState({
    name: "",
    degree:"",
    questions: [
      { questionText: "", options: [{ optionText: "", isCorrect: false }] },
    ],
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get weeks & lectures from selected course
  const selectedCourse = courses.find(
    (c) => c.id === parseInt(selectedCourseId)
  );
  const weeks = selectedCourse ? selectedCourse.weeks : [];
  const selectedWeek = weeks.find((w) => w.id === parseInt(selectedWeekId));
  const lectures = selectedWeek ? selectedWeek.lectures : [];

  // Handle input changes
  const handleHomeworkChange = (e) => {
    setHomework({ ...homework, [e.target.name]: e.target.value });
  };

  // Handle question changes
  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...homework.questions];
    updatedQuestions[index][e.target.name] = e.target.value;
    setHomework({ ...homework, questions: updatedQuestions });
  };

  // Handle option changes
  const handleOptionChange = (qIndex, oIndex, e) => {
    const updatedQuestions = [...homework.questions];
    updatedQuestions[qIndex].options[oIndex][e.target.name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setHomework({ ...homework, questions: updatedQuestions });
  };

  // Add a new question
  const addQuestion = () => {
    setHomework({
      ...homework,
      questions: [
        ...homework.questions,
        { questionText: "", options: [{ optionText: "", isCorrect: false }] },
      ],
    });
  };

  // Add a new option to a question
  const addOption = (qIndex) => {
    const updatedQuestions = [...homework.questions];
    updatedQuestions[qIndex].options.push({ optionText: "", isCorrect: false });
    setHomework({ ...homework, questions: updatedQuestions });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !selectedCourseId ||
      !selectedWeekId ||
      !selectedLectureId ||
      !homework.name
    ) {
      setMessage("All fields are required!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:5020/api/courses/${selectedCourseId}/weeks/${selectedWeekId}/lectures/${selectedLectureId}/homeworks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(homework),
        }
      );

      if (!res.ok) throw new Error("Failed to add homework");
      setMessage("Homework added successfully 🎉!");
      setHomework({
        name: "",
        questions: [
          { questionText: "", options: [{ optionText: "", isCorrect: false }] },
        ],
      });
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Homework</h2>
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

        {/* Homework Form */}
        {selectedLectureId && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Homework Name"
              value={homework.name}
              onChange={handleHomeworkChange}
              required
              className="w-full p-2 bg-gray-700 rounded-lg text-white"
            />
            <input
              type="text"
              name="degree"
              placeholder="degree "
              value={homework.degree}
              onChange={handleHomeworkChange}
              required
              className="w-full p-2 bg-gray-700 rounded-lg text-white"
            />

            {/* Questions */}
            {homework.questions.map((question, qIndex) => (
              <div key={qIndex} className="border p-4 rounded-lg bg-gray-700">
                <input
                  type="text"
                  name="questionText"
                  placeholder="Question"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  required
                  className="w-full p-2 bg-gray-800 rounded-lg text-white mb-2"
                />

                {/* Options */}
                {question.options.map((option, oIndex) => (
                  <div
                    key={oIndex}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <input
                      type="text"
                      name="optionText"
                      placeholder="Option"
                      value={option.optionText}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      required
                      className="flex-1 p-2 bg-gray-800 rounded-lg text-white"
                    />
                    <input
                      type="checkbox"
                      name="isCorrect"
                      checked={option.isCorrect}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      className="w-5 h-5"
                    />
                    <label className="text-sm">Correct</label>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addOption(qIndex)}
                  className="text-blue-400"
                >
                  + Add Option
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addQuestion}
              className="text-green-400"
            >
              + Add Question
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
            >
              {loading ? "Adding..." : "Add Homework"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddHomework;
