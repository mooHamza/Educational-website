import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Courses_Context } from "../Contexts/CoursesContext";
import axios from "axios";
const YearsList = () => {
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    GetGrades();
  }, []);

  const GetGrades = () => {
    axios
      .get("http://localhost:5020/api/Grades")
      .then((res) => {
        console.log(res.data);
        setGrades(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className=" container grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-8 mb-14">
      {grades.map((grade) => (
        <div
          key={grade.id}
          onClick={() => {
            navigate(`/monthsList/${grade.gradeName}`);
          }}
          className="p-4 rounded-md bg-green-500 cursor-pointer"
        >
          <p> {grade.gradeName} </p>
        </div>
      ))}
    </div>
  );
};

export default YearsList;
