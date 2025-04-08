import React, { useContext, useState } from "react";
import axios from "axios";
import { Grades_Context } from "../../../Contexts/GradesContext";

const CreateUser = () => {
  const { grades } = useContext(Grades_Context);
  const [errors, setErrors] = useState([]);
  const [userData, setuserData] = useState({
    firstName: "",
    secondName: "",
    phone: "",
    grade: "الثالث الثانوى",
    city: "السويس",
    email: "",
    userPassword: "",
  });

  console.log(grades);

  const handleChange = (e) => {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5020/api/Users/register",
        userData
      );
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  const cities = [
    "السويس",
    "القاهرة",
    "الجيزه",
    "القلبوبيه",
    "بنى سويف",
    "الاسماعيلية",
    "اسوان",
    "الاسكندرية",
    "اسيوط",
    "الاقصر",
  ];

  return (
    <div className="p-6 bg-gray-800 text-gray-200 h-full ">
      <div>
        <div className="hidden lg:block lg:w-1/2 max-w-[400px]">
          <img src="/teacher.jpg" alt="" className="rounded-lg shadow-lg" />
        </div>
        <form
          className="lg:w-1/2 py-10 lg:grid gap-4 grid-cols-2 p-4 bg-gray-800 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-bold my-6 text-blue-400 col-span-2">
            حساب جديد :
          </h1>

          {/* First Name */}
          <div className="relative my-6">
            <input
              id="firstName"
              name="firstName"
              value={userData.firstName}
              className="peer w-full focus:outline-none focus:border-b-4 border-blue-400 bg-gray-900 text-gray-200 border-b p-2 mx-2"
              onChange={handleChange}
              type="text"
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-400
                ${userData.firstName ? "-top-4 text-sm text-blue-400" : ""}`}
              htmlFor="firstName"
            >
              الاسم الاول
            </label>
            {errors.firstName && (
              <p className="text-red-500">{`*${errors.firstName}`}</p>
            )}{" "}
          </div>

          {/* Last Name */}
          <div className="relative my-6">
            <input
              id="secondName"
              name="secondName"
              value={userData.secondName}
              type="text"
              required
              className="peer w-full focus:outline-none focus:border-b-4 border-blue-400 bg-gray-900 text-gray-200 border-b p-2 mx-2"
              onChange={handleChange}
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-400
                ${userData.secondName ? "-top-4 text-sm text-blue-400" : ""}`}
              htmlFor="secondName"
            >
              الاسم الثانى
            </label>
            {errors.secondName && (
              <p className="text-red-500">{`*${errors.secondName}`}</p>
            )}{" "}
          </div>

          {/* Phone */}
          <div className="relative my-6">
            <input
              type="phone"
              id="phone"
              name="phone"
              value={userData.phone}
              className="peer w-full focus:outline-none focus:border-b-4 border-blue-400 bg-gray-900 text-gray-200 border-b p-2 mx-2"
              onChange={handleChange}
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
            peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-400
            ${userData.phone ? "-top-4 text-sm text-blue-400" : ""}`}
              htmlFor="phone"
            >
              رقم الهاتف
            </label>
            {errors.phone && (
              <p className="text-red-500">{`*${errors.phone}`}</p>
            )}
          </div>

          {/* City Dropdown */}
          <div className="col-span-2 my-4">
            <select
              name="city"
              id="city"
              value={userData.city}
              onChange={handleChange}
              className="w-full border border-blue-400 bg-gray-900 text-gray-200 border-b p-2 mx-2"
              required
            >
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-500">{`*${errors.city}`}</p>}
          </div>

          {/* Grade Dropdown */}
          <div className="col-span-2">
            <select
              name="grade"
              id="grade"
              onChange={handleChange}
              value={userData.grade}
              className="w-full border border-blue-400 bg-gray-900 text-gray-200 border-b p-2 mx-2"
              required
            >
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.gradeName}
                </option>
              ))}
            </select>
            {errors.grade && (
              <p className="text-red-500">{`*${errors.grade}`}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative my-6 col-span-2">
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="peer w-full focus:outline-none focus:border-b-4 border-blue-400 bg-gray-900 text-gray-200 border-b p-2 mx-2"
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-400
                ${userData.email ? "-top-4 text-sm text-blue-400" : ""}`}
              htmlFor="email"
            >
              البريد الالكترونى
            </label>
            {errors.email && (
              <p className="text-red-500">{`*${errors.email}`}</p>
            )}
            {errors.existEmail && (
              <p className="text-red-500">{`*${errors.existEmail}`}</p>
            )}
          </div>

          {/* userPassword */}
          <div className="relative my-6">
            <input
              type="userPassword"
              id="userPassword"
              name="userPassword"
              value={userData.userPassword}
              onChange={handleChange}
              className="peer w-full focus:outline-none focus:border-b-4 border-blue-400 bg-gray-900 text-gray-200 border-b p-2 mx-2"
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-400
                ${userData.userPassword ? "-top-4 text-sm text-blue-400" : ""}`}
              htmlFor="userPassword"
            >
              كلمة السر
            </label>
            {errors.password && (
              <p className="text-red-500">{`*${errors.password}`}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="px-6 py-3 bg-blue-400 text-gray-900 font-bold hover:scale-105 duration-300"
            type="submit"
          >
            انشئ الحساب
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
