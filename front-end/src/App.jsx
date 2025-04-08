import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import Footer from "./components/Footer";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import MonthsList from "./Pages/MonthsList";
import CourseDetails from "./components/CourseDetails";
import ScrollToTop from "./components/ScrollToTop";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import Users from "./components/admin-dashboard/Users";
import EditUser from "./components/admin-dashboard/manageUsers/EditUser";
import CreateUser from "./components/admin-dashboard/manageUsers/CreateUser";
import EditCourse from "./components/admin-dashboard/manageCourses/EditCourse";
import Homework from "./components/Homework";

import SeeVideo from "./components/SeeVideo";
import Add_Course from "./components/admin-dashboard/manageCourses/Add_Course";
import ManageCourses from "./components/admin-dashboard/ManageCourses";
import AddWeek from "./components/admin-dashboard/manageCourses/manageWeeks/AddWeek";
import AddCourse from "./components/admin-dashboard/manageCourses/AddCourse";
import DeleteCourse from "./components/admin-dashboard/manageCourses/DeleteCourse";
import UpdateWeek from "./components/admin-dashboard/manageCourses/manageWeeks/UpdateWeek";
import DeleteWeek from "./components/admin-dashboard/manageCourses/manageWeeks/DeleteWeek";
import AddLecture from "./components/admin-dashboard/manageCourses/manageLectures/AddLecture";
import UpdateLecture from "./components/admin-dashboard/manageCourses/manageLectures/UpdateLecture";
import DeleteLecture from "./components/admin-dashboard/manageCourses/manageLectures/DeleteLecture";
import AddHomework from "./components/admin-dashboard/manageCourses/manageHomeworks/AddHomework";
import DeleteHomework from "./components/admin-dashboard/manageCourses/manageHomeworks/DeleteHomework";
import UpdateHomework from "./components/admin-dashboard/manageCourses/manageHomeworks/UpdateHomework";
import BookCourse from "./components/admin-dashboard/BookCourse";
import GetUserEvaluation from "./components/admin-dashboard/manageUsers/GetUserEvaluation";

const App = () => {
  const location = useLocation();

  {
    !location.pathname.startsWith("/admin-dashboard") && <Header />;
  }
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/monthsList/:grade" element={<MonthsList />} />
        <Route path="/courseDetails/:courseId" element={<CourseDetails />} />
        <Route path="/seeVideo" element={<SeeVideo />} />

        <Route path="/homework" element={<Homework />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<Users />} />
          <Route path="users" element={<Users />} />
          <Route path="Edit-user" element={<EditUser />} />
          <Route path="createUser" element={<CreateUser />} />
          <Route path="bookCourse" element={<BookCourse />} /> 
          <Route path="getUserEvaluations" element={<GetUserEvaluation />} /> 

          {/* manage courses */}
          <Route path="manageCourses" element={<ManageCourses />}>
            <Route index element={<Add_Course />} />

            <Route path="addCourse" element={<AddCourse />} />
            <Route path="add_Course" element={<Add_Course />} />
            <Route path="editCourse" element={<EditCourse />} />
            <Route path="deleteCourse" element={<DeleteCourse />} />
            <Route path="addWeek" element={<AddWeek />} />
            <Route path="updateWeek" element={<UpdateWeek />} />
            <Route path="deleteWeek" element={<DeleteWeek />} />
            <Route path="addLecture" element={<AddLecture />} />
            <Route path="updateLecture" element={<UpdateLecture />} />
            <Route path="deleteLecture" element={<DeleteLecture />} />
            <Route path="addHomework" element={<AddHomework />} />
            <Route path="deleteHomework" element={<DeleteHomework />} />
            <Route path="updateHomework" element={<UpdateHomework />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
