import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export var Grades_Context = createContext();
const GradesContext = ({ children }) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    GetGrades();
  }, []);

  const GetGrades = () => {
    axios
      .get("http://localhost:5020/api/Grades")
      .then((res) => {
        setGrades(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Grades_Context.Provider value={{ grades }}>
      {children}
    </Grades_Context.Provider>
  );
};

export default GradesContext;
