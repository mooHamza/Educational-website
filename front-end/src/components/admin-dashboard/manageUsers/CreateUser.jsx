import React, { useContext, useState } from "react";
import axios from "axios";
import { Grades_Context } from "../../../Contexts/GradesContext";

const CreateUser = () => {
  const { grades } = useContext(Grades_Context);
  const [errors, setErrors] = useState([]);
  const [userData, setuserData] = useState({
    firstName: "",
    secondName: "",
    phoneNumber: "",
    gradeId: "1",
    city: "السويس",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const handleChange = (e) => {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Frontend validation for confirm password
    if (userData.password !== userData.confirmedPassword) {
      setErrors({ confirmedPassword: "كلمة السر غير متطابقة" });
      return;
    }

    try {
      const submitData = {
        ...userData,
        ConfirmedPassword: userData.confirmedPassword,
      };

      const response = await axios.post(
        "http://localhost:5020/api/Users/register",
        submitData
      );
      if (response.status === 200) {
        setuserData({
          firstName: "",
          secondName: "",
          phoneNumber: "",
          gradeId: "1",
          city: "السويس",
          email: "",
          password: "",
          confirmedPassword: "",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        const backendError = error.response.data;

        // Handle different error formats
        if (backendError.errors) {
          const formattedErrors = {};

          // Handle object-style errors (like PhoneNumber validation)
          if (
            typeof backendError.errors === "object" &&
            !Array.isArray(backendError.errors)
          ) {
            Object.keys(backendError.errors).forEach((key) => {
              const camelCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
              // Join multiple error messages for the same field
              formattedErrors[camelCaseKey] =
                backendError.errors[key].join(" ");

              // Special handling for phone number errors
              if (key === "PhoneNumber") {
                formattedErrors.phoneNumber =
                  "رقم الهاتف غير صحيح. يرجى إدخال رقم صحيح.";
              }
            });
          }
          // Handle array-style errors (like password requirements)
          else if (Array.isArray(backendError.errors)) {
            const passwordErrors = backendError.errors.filter((err) =>
              err.includes("Passwords must")
            );

            if (passwordErrors.length > 0) {
              formattedErrors.password = passwordErrors
                .map((err) => {
                  if (err.includes("non alphanumeric"))
                    return "يجب أن تحتوي كلمة السر على حرف خاص واحد على الأقل (!@#$%^&*)";
                  if (err.includes("lowercase"))
                    return "يجب أن تحتوي كلمة السر على حرف صغير واحد على الأقل (a-z)";
                  if (err.includes("uppercase"))
                    return "يجب أن تحتوي كلمة السر على حرف كبير واحد على الأقل (A-Z)";
                  if (err.includes("digit"))
                    return "يجب أن تحتوي كلمة السر على رقم واحد على الأقل (0-9)";
                  if (err.includes("least 6 characters"))
                    return "يجب أن تحتوي كلمة السر على 6 أحرف على الأقل";
                  return err;
                })
                .join("\n");
            }
          }

          setErrors(formattedErrors);
        } else if (backendError.message === "Username is already taken.") {
          setErrors({
            email:
              "البريد الإلكتروني مستخدم بالفعل. يرجى استخدام بريد إلكتروني آخر.",
          });
        }
        // Handle simple message
        else if (backendError.message) {
          setErrors({ general: backendError.message });
        } else {
          setErrors({ general: "حدث خطأ غير متوقع" });
        }
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
              type="phoneNumber"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.phoneNumber}
              className="peer w-full focus:outline-none focus:border-b-4 border-blue-400 bg-gray-900 text-gray-200 border-b p-2 mx-2"
              onChange={handleChange}
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
            peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-400
            ${userData.phoneNumber ? "-top-4 text-sm text-blue-400" : ""}`}
              htmlFor="phoneNumber"
            >
              رقم الهاتف
            </label>
            {errors.phoneNumber && (
              <p className="text-red-500">{`*${errors.phoneNumber}`}</p>
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
          </div>

          {/* userPassword */}
          <div className="relative my-6">
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="peer w-full focus:outline-none focus:border-b-4 border-blue-400 bg-gray-900 text-gray-200 border-b p-2 mx-2"
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-400
                ${userData.password ? "-top-4 text-sm text-blue-400" : ""}`}
              htmlFor="password"
            >
              كلمة السر
            </label>
            {errors.password && (
              <div className="text-red-500 whitespace-pre-line mt-2">
                {errors.password.split("\n").map((line, i) => (
                  <p key={i}>* {line}</p>
                ))}
              </div>
            )}
          </div>
          <div className="relative my-6 col-span-2">
            <input
              type="password"
              id="confirmedPassword"
              name="confirmedPassword"
              value={userData.confirmedPassword}
              onChange={handleChange}
              className="peer w-full focus:outline-none focus:border-b-4 border-blue-400 bg-gray-900 text-gray-200 border-b p-2 mx-2"
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-400
                ${userData.password ? "-top-4 text-sm text-blue-400" : ""}`}
              htmlFor="confirmedPassword"
            >
              تأكيد كلمة السر
            </label>
            {errors.confirmedPassword && (
              <p className="text-red-500">{`*${errors.confirmedPassword}`}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-red-500 col-span-2">{`*${errors.general}`}</p>
          )}
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
