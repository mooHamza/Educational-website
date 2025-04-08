import React, { useState, useContext, useEffect } from "react";
import { Courses_Context } from "../Contexts/CoursesContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/authContext";

const Homework = () => {
  const location = useLocation();
  const homework = location.state?.homework;
  const { user } = useContext(AuthContext);
  const [score, setScore] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userSavedAnswers, setUserSavedAnswers] = useState([]);

  const addAnswer = (QuestionId, OptionId) => {
    setUserAnswers((prevAnswers) => {
      const filteredAnswers = prevAnswers.filter(
        (answer) => answer.QuestionId !== QuestionId
      );
      return [...filteredAnswers, { QuestionId, OptionId }];
    });
  };


  const GetHomeworkEvaluation = () => {
    axios
      .get(
        `http://localhost:5020/api/Users/${user.Id}/homeworks/${homework.id}`
      )
      .then((res) => {
        setEvaluation(res.data.score);
        setUserSavedAnswers(res.data.user_Answers);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (user) {
      GetHomeworkEvaluation();
    }
  }, [user]);

  const calculateScore = () => {
    let score = 0;
    homework.questions.forEach((question) => {
      const questionId = question.id;
      question.options.forEach((option) => {
        if (option.isCorrect) {
          var userAnswerOnthisQ = userAnswers.find(
            (x) => x.QuestionId === questionId
          );
          if (userAnswerOnthisQ.OptionId === option.id) {
            score++;
          }
        }
      });
    });
    return score;
  };

  const setColor = (QuestionId, OptionId, isCorrect) => {
    var userAnswerONQ = userSavedAnswers.find(
      (x) => x.questionId == QuestionId
    );

    if ( userAnswerONQ.optionID == OptionId &&isCorrect) {
        return "bg-green-500";
      }
      else if (userAnswerONQ.optionID == OptionId && !isCorrect)
         return "bg-red-300";
  };
  const handleSubmit = async () => {
    const result = calculateScore();
    try {
      const response = await axios.post(
        `http://localhost:5020/api/Users/${user.Id}/homeworks/${homework.id}/score/${result}`,
        userAnswers,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setScore(result);
      console.log(response);
    } catch (error) {
      console.error("Error submitting homework:", error);
    }
  };

  return (
    <div className="mt-[90px] p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">{homework?.name}</h1>

      {homework?.questions?.map((question) => (
        <div
          key={question.id}
          className="mb-8 p-4 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">
            {question.questionText}
          </h2>
          <ul className="list-none space-y-2">
            {question?.options?.map((option) => (
              <li
                key={option.id}
                onClick={() =>
                  evaluation == null && addAnswer(question.id, option.id)
                }
                className={`p-4 rounded-md cursor-pointer transition-colors ${
                  userSavedAnswers.length > 0
                    ? setColor(question.id, option.id, option.isCorrect)
                    : evaluation != null
                    ? "bg-gray-100"
                    : userAnswers.some(
                        (x) =>
                          x.QuestionId == question.id && x.OptionId == option.id
                      )
                    ? "bg-blue-200"
                    : "bg-gray-100"
                }`}
              >
                {option.optionText}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {evaluation || evaluation == 0 ? (
        <p className="text-center bg-black font-semibold text-white rounded-md p-3">
          your score is {evaluation} from {homework.degree}
        </p>
      ) :
       score || score == 0 
       ?
         (<div 
         className="text-center bg-black font-semibold text-white rounded-md p-3"
         >you score is {score} from {homework.degree} </div>)

        :
        (
          <button
            onClick={handleSubmit}
            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          >
            Submit Homework
          </button>
        )
      }
    </div>
  );
};

export default Homework;
