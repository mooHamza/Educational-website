import React, { useContext, useState } from "react";
import { User_Context } from "../../../Contexts/UserContext";
import axios from "axios";

const GetUserEvaluation = () => {
  const [input, setInput] = useState("");
  const [evaluations, setEvaluations] = useState([]);
  const { users } = useContext(User_Context);
  console.log(users);

  const EmailsOnSearch = users.filter((user) =>
    user.email.toLowerCase().includes(input.toLowerCase())
  );
  const getUserEvaluation = (Id) => {
    axios
      .get(`http://localhost:5020/api/Users/${Id}/homeworks`)
      .then((res) => {
        console.log(res.data);
        setEvaluations(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-6 bg-gray-800 text-gray-200 h-full " dir="ltr">
      <h1 className="text-2xl font-bold mb-4">User Homeworks</h1>

      <div className=" my-4">
        <label className="text-lg font-semibold " htmlFor="email">
          Enter user email
        </label>
        <input
          type="text"
          className="bg-gray-700 text-white rounded p-2 block my-2"
          placeholder="email"
          id="email"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <ul className="max-h-[200px] overflow-y-auto bg-gray-700">
        {EmailsOnSearch.map((user) => (
          <li
            key={user.id}
            onClick={() => {
              getUserEvaluation(user.id);
              setInput(user.email);
            }}
            className="cursor-pointer p-2 border-b-2 border-gray-900"
          >
            {user.email}
          </li>
        ))}
      </ul>

      {evaluations.length > 0 ? (
        <table className="min-w-full bg-gray-900 rounded-lg overflow-auto my-3">
          <thead>
            <tr className="bg-gray-700 ">
              <th className="py-2 px-4 text-left">first name</th>
              <th className="py-2 px-4 text-left">second name</th>
              <th className="py-2 px-4 text-left">homework</th>
              <th className="py-2 px-4 text-left">score </th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((evaluation) => (
              <tr key={evaluation.homeworkId}>
                <td className="py-2 px-4">{evaluation.firstName}</td>
                <td className="py-2 px-4">{evaluation.secendName}</td>
                <td className="py-2 px-4">{evaluation.name}</td>
                <td className="py-2 px-4">{evaluation.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="my-4 font-semibold">
          user with email <span className="text-lg text-red-500">{input}</span>{" "}
          does not have evaluations
        </p>
      )}
    </div>
  );
};

export default GetUserEvaluation;
