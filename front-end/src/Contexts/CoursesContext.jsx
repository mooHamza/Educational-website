import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const Courses_Context = createContext();

const CoursesContext = ({ children }) => {
  const [courses, setCourses] = useState([]);
  // const [courses, setCourses] = useState(() => {
  //   const savedCourses = localStorage.getItem("courses");
  //   return savedCourses ? JSON.parse(savedCourses) : [];
  // });

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    axios
      .get("http://localhost:5020/api/Courses")
      .then((res) => {
        // localStorage.setItem("courses", JSON.stringify(res.data));
        setCourses(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getCourse = (id) => {
    axios.get(`http://localhost:5020/api/Courses/${id}`);
  };
  return (
    <Courses_Context.Provider
      value={{
        courses,
        setCourses,
        getCourse,
        getCourses,
      }}
    >
      {children}
    </Courses_Context.Provider>
  );
};

export default CoursesContext;
