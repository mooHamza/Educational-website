import React, { useContext, useState } from "react";
import axios from "axios";
import { Grades_Context } from "../../../Contexts/GradesContext";

const AddCourse = () => {
  // Initial state for the course with nested structure
  const { grades } = useContext(Grades_Context);
  console.log(grades);

  const [course, setCourse] = useState({
    name: "",
    description: "",
    price: "",
    gradeId: "",
    weeks: [
      {
        weekNumber: "",
        content: "",
        lectures: [
          {
            name: "",
            file: null,
            homeworks: [
              {
                name: "",
                questions: [
                  {
                    questionText: "",
                    options: [
                      { optionText: "", isCorrect: false },
                      { optionText: "", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  // Update top-level course fields
  const handleCourseChange = (field, value) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
  };

  // Update week fields
  const handleWeekChange = (weekIndex, field, value) => {
    setCourse((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w, i) =>
        i === weekIndex ? { ...w, [field]: value } : w
      ),
    }));
  };

  // Update lecture fields
  const handleLectureChange = (weekIndex, lectureIndex, field, value) => {
    setCourse((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w, wi) =>
        wi === weekIndex
          ? {
              ...w,
              lectures: w.lectures.map((l, li) =>
                li === lectureIndex ? { ...l, [field]: value } : l
              ),
            }
          : w
      ),
    }));
  };

  // Handle file uploads for lectures
  const handleFileChange = (weekIndex, lectureIndex, file) => {
    handleLectureChange(weekIndex, lectureIndex, "file", file);
  };

  // Update homework fields
  const handleHomeworkChange = (
    weekIndex,
    lectureIndex,
    homeworkIndex,
    field,
    value
  ) => {
    setCourse((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w, wi) =>
        wi === weekIndex
          ? {
              ...w,
              lectures: w.lectures.map((l, li) =>
                li === lectureIndex
                  ? {
                      ...l,
                      homeworks: l.homeworks.map((h, hi) =>
                        hi === homeworkIndex ? { ...h, [field]: value } : h
                      ),
                    }
                  : l
              ),
            }
          : w
      ),
    }));
  };

  // Update question fields
  const handleQuestionChange = (
    weekIndex,
    lectureIndex,
    homeworkIndex,
    questionIndex,
    field,
    value
  ) => {
    setCourse((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w, wi) =>
        wi === weekIndex
          ? {
              ...w,
              lectures: w.lectures.map((l, li) =>
                li === lectureIndex
                  ? {
                      ...l,
                      homeworks: l.homeworks.map((h, hi) =>
                        hi === homeworkIndex
                          ? {
                              ...h,
                              questions: h.questions.map((q, qi) =>
                                qi === questionIndex
                                  ? { ...q, [field]: value }
                                  : q
                              ),
                            }
                          : h
                      ),
                    }
                  : l
              ),
            }
          : w
      ),
    }));
  };

  // Update option fields
  const handleOptionChange = (
    weekIndex,
    lectureIndex,
    homeworkIndex,
    questionIndex,
    optionIndex,
    field,
    value
  ) => {
    setCourse((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w, wi) =>
        wi === weekIndex
          ? {
              ...w,
              lectures: w.lectures.map((l, li) =>
                li === lectureIndex
                  ? {
                      ...l,
                      homeworks: l.homeworks.map((h, hi) =>
                        hi === homeworkIndex
                          ? {
                              ...h,
                              questions: h.questions.map((q, qi) =>
                                qi === questionIndex
                                  ? {
                                      ...q,
                                      options: q.options.map((o, oi) =>
                                        oi === optionIndex
                                          ? { ...o, [field]: value }
                                          : o
                                      ),
                                    }
                                  : q
                              ),
                            }
                          : h
                      ),
                    }
                  : l
              ),
            }
          : w
      ),
    }));
  };

  // Add a new week
  const addWeek = () => {
    setCourse((prev) => ({
      ...prev,
      weeks: [...prev.weeks, { weekNumber: "", content: "", lectures: [] }],
    }));
  };

  // Add a new lecture to a week
  const addLecture = (weekIndex) => {
    setCourse((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w, i) =>
        i === weekIndex
          ? {
              ...w,
              lectures: [
                ...w.lectures,
                { name: "", file: null, homeworks: [] },
              ],
            }
          : w
      ),
    }));
  };

  // Add a new homework to a lecture
  const addHomework = (weekIndex, lectureIndex) => {
    setCourse((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w, wi) =>
        wi === weekIndex
          ? {
              ...w,
              lectures: w.lectures.map((l, li) =>
                li === lectureIndex
                  ? {
                      ...l,
                      homeworks: [...l.homeworks, { name: "", questions: [] }],
                    }
                  : l
              ),
            }
          : w
      ),
    }));
  };

  // Add a new question to a homework
  const addQuestion = (weekIndex, lectureIndex, homeworkIndex) => {
    setCourse((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w, wi) =>
        wi === weekIndex
          ? {
              ...w,
              lectures: w.lectures.map((l, li) =>
                li === lectureIndex
                  ? {
                      ...l,
                      homeworks: l.homeworks.map((h, hi) =>
                        hi === homeworkIndex
                          ? {
                              ...h,
                              questions: [
                                ...h.questions,
                                { questionText: "", options: [] },
                              ],
                            }
                          : h
                      ),
                    }
                  : l
              ),
            }
          : w
      ),
    }));
  };

  // Add a new option to a question
  const addOption = (weekIndex, lectureIndex, homeworkIndex, questionIndex) => {
    setCourse((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w, wi) =>
        wi === weekIndex
          ? {
              ...w,
              lectures: w.lectures.map((l, li) =>
                li === lectureIndex
                  ? {
                      ...l,
                      homeworks: l.homeworks.map((h, hi) =>
                        hi === homeworkIndex
                          ? {
                              ...h,
                              questions: h.questions.map((q, qi) =>
                                qi === questionIndex
                                  ? {
                                      ...q,
                                      options: [
                                        ...q.options,
                                        { optionText: "", isCorrect: false },
                                      ],
                                    }
                                  : q
                              ),
                            }
                          : h
                      ),
                    }
                  : l
              ),
            }
          : w
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for API submission
    const formData = new FormData();
    formData.append("Name", course.name);
    formData.append("Description", course.description);
    formData.append("Price", course.price);
    formData.append("GradeId", course.gradeId);

    // Append nested data with correct field names
    course.weeks.forEach((week, weekIndex) => {
      formData.append(`Weeks[${weekIndex}].WeekNumber`, week.weekNumber);
      formData.append(`Weeks[${weekIndex}].Content`, week.content);
      week.lectures.forEach((lecture, lectureIndex) => {
        formData.append(
          `Weeks[${weekIndex}].Lectures[${lectureIndex}].Name`,
          lecture.name
        );
        if (lecture.file) {
          formData.append(
            `Weeks[${weekIndex}].Lectures[${lectureIndex}].File`,
            lecture.file
          );
        }
        lecture.homeworks.forEach((homework, homeworkIndex) => {
          formData.append(
            `Weeks[${weekIndex}].Lectures[${lectureIndex}].Homeworks[${homeworkIndex}].Name`,
            homework.name
          );
          homework.questions.forEach((question, questionIndex) => {
            formData.append(
              `Weeks[${weekIndex}].Lectures[${lectureIndex}].Homeworks[${homeworkIndex}].Questions[${questionIndex}].QuestionText`,
              question.questionText
            );
            question.options.forEach((option, optionIndex) => {
              formData.append(
                `Weeks[${weekIndex}].Lectures[${lectureIndex}].Homeworks[${homeworkIndex}].Questions[${questionIndex}].Options[${optionIndex}].OptionText`,
                option.optionText
              );
              formData.append(
                `Weeks[${weekIndex}].Lectures[${lectureIndex}].Homeworks[${homeworkIndex}].Questions[${questionIndex}].Options[${optionIndex}].IsCorrect`,
                option.isCorrect.toString()
              );
            });
          });
        });
      });
    });

    try {
      const response = await axios.post(
        "http://localhost:5020/api/Courses",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Course created:", response.data);
      // Reset form after successful submission
      setCourse({
        name: "",
        description: "",
        price: "",
        gradeId: "",
        weeks: [{ weekNumber: "", content: "", lectures: [] }],
      });
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 text-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Create a Course</h2>

      <div className="mb-4">
        <label className="block mb-1">Name:</label>
        <input
          type="text"
          value={course.name}
          onChange={(e) => handleCourseChange("name", e.target.value)}
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Description:</label>
        <textarea
          value={course.description}
          onChange={(e) => handleCourseChange("description", e.target.value)}
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Price:</label>
        <input
          type="number"
          value={course.price}
          onChange={(e) => handleCourseChange("price", e.target.value)}
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Grade:</label>
        <select
          value={course.gradeId}
          onChange={(e) => handleCourseChange("gradeId", e.target.value)}
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          <option value="">Select Grade</option>
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.gradeName}
            </option>
          ))}
        </select>
      </div>

      {/* Weeks */}
      <h3 className="text-xl font-semibold mt-6">Weeks</h3>
      {course.weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="bg-gray-800 p-4 rounded mt-4">
          <h4 className="text-lg font-semibold">Week {weekIndex + 1}</h4>
          <div className="mb-2">
            <label className="block">Week Number:</label>
            <input
              type="number"
              value={week.weekNumber}
              onChange={(e) =>
                handleWeekChange(weekIndex, "weekNumber", e.target.value)
              }
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block">Content:</label>
            <textarea
              value={week.content}
              onChange={(e) =>
                handleWeekChange(weekIndex, "content", e.target.value)
              }
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>

          {/* Lectures */}
          <h5 className="font-semibold mt-4">Lectures</h5>
          {week.lectures.map((lecture, lectureIndex) => (
            <div key={lectureIndex} className="bg-gray-700 p-3 rounded mt-2">
              <h6 className="font-semibold">Lecture {lectureIndex + 1}</h6>
              <div className="mb-2">
                <label className="block">Name:</label>
                <input
                  type="text"
                  value={lecture.name}
                  onChange={(e) =>
                    handleLectureChange(
                      weekIndex,
                      lectureIndex,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full p-2 bg-gray-600 text-white rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">File:</label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileChange(weekIndex, lectureIndex, e.target.files[0])
                  }
                  className="w-full p-2 bg-gray-600 text-white rounded"
                />
              </div>

              {/* Homeworks */}
              <h6 className="font-semibold mt-4">Homeworks</h6>
              {lecture.homeworks.map((homework, homeworkIndex) => (
                <div
                  key={homeworkIndex}
                  className="bg-gray-700 p-3 rounded mt-2"
                >
                  <h6 className="font-semibold">
                    Homework {homeworkIndex + 1}
                  </h6>
                  <div>
                    <label className="block">Name:</label>
                    <input
                      type="text"
                      value={homework.name}
                      onChange={(e) =>
                        handleHomeworkChange(
                          weekIndex,
                          lectureIndex,
                          homeworkIndex,
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full p-2 bg-gray-600 text-white rounded"
                    />
                  </div>

                  {/* Questions */}
                  <h6 className="font-semibold mt-4">Questions</h6>
                  {homework.questions.map((question, questionIndex) => (
                    <div
                      key={questionIndex}
                      className="bg-gray-700 p-3 rounded mt-2"
                    >
                      <h6 className="font-semibold">
                        Question {questionIndex + 1}
                      </h6>
                      <div>
                        <label className="block">Question Text:</label>
                        <input
                          type="text"
                          value={question.questionText}
                          onChange={(e) =>
                            handleQuestionChange(
                              weekIndex,
                              lectureIndex,
                              homeworkIndex,
                              questionIndex,
                              "questionText",
                              e.target.value
                            )
                          }
                          className="w-full p-2 bg-gray-600 text-white rounded"
                        />
                      </div>

                      {/* Options */}
                      <h6 className="font-semibold mt-4">Options</h6>
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="bg-gray-700 p-3 rounded mt-2"
                        >
                          <label className="block">
                            Option {optionIndex + 1}:
                          </label>
                          <input
                            type="text"
                            value={option.optionText}
                            onChange={(e) =>
                              handleOptionChange(
                                weekIndex,
                                lectureIndex,
                                homeworkIndex,
                                questionIndex,
                                optionIndex,
                                "optionText",
                                e.target.value
                              )
                            }
                            className="text-black"
                          />
                          <label>
                            <input
                              type="checkbox"
                              checked={option.isCorrect}
                              onChange={(e) =>
                                handleOptionChange(
                                  weekIndex,
                                  lectureIndex,
                                  homeworkIndex,
                                  questionIndex,
                                  optionIndex,
                                  "isCorrect",
                                  e.target.checked
                                )
                              }
                              className="w-full p-2 bg-gray-600 text-white rounded"
                            />
                            Is Correct
                          </label>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          addOption(
                            weekIndex,
                            lectureIndex,
                            homeworkIndex,
                            questionIndex
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded mt-2"
                      >
                        Add Option
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      addQuestion(weekIndex, lectureIndex, homeworkIndex)
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded mt-2"
                  >
                    Add Question
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addHomework(weekIndex, lectureIndex)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-2 rounded mt-2"
              >
                Add Homework
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addLecture(weekIndex)}
            className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-2 rounded mt-2"
          >
            Add Lecture
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addWeek}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-4"
      >
        Add Week
      </button>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 mt-4 rounded"
      >
        Create Course
      </button>
    </form>
  );
};

export default AddCourse;
