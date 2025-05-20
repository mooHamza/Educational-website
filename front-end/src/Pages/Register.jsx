import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
/*
  Updates:
  - Handles backend error messages for username/email taken and registration failures.
  - Maps backend error structure to UI errors.
  - Renames 'userPassword' to 'password' to match backend DTO.
  - Adds confirm password field and validation.
  - Handles required field validation.
*/

const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [grades, setgrades] = useState([]);
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

  useEffect(() => {
    Getgrades();
  }, []);

  const Getgrades = () => {
    axios
      .get("http://localhost:5020/api/grades")
      .then((res) => {
        setgrades(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

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
      navigate("/login");
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
      } else {
        setErrors({ general: "حدث خطأ في الاتصال بالخادم" });
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
    <div className="container mt-[85px]">
      <div className="flex flex-col lg:flex-row ">
        <div className="hidden lg:block lg:w-1/2 max-w-[400px]">
          <img src="/teacher.jpg" alt="" />
        </div>
        <form
          action=""
          className="lg:w-1/2 py-10 lg:grid gap-4 grid-cols-2 p-2"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-bold my-6 text-primary col-span-2">
            أنشء حسابك الآن :
          </h1>
          <div className="relative my-6">
            <input
              id="firstName"
              name="firstName"
              value={userData.firstName}
              className="peer w-full focus:outline-none focus:border-b-4 border-primary border-b p-2 mx-2"
              onChange={handleChange}
              type="text"
              required
            />
            <label
              className={`absolute right-2 
                top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
                ${userData.firstName ? "-top-4 text-sm text-primary" : ""}
               `}
              htmlFor="firstName"
            >
              الاسم الاول
            </label>
            {errors.firstName && (
              <p className="text-red-500">{`*${errors.firstName}`}</p>
            )}
          </div>
          <div className="relative my-6">
            <input
              id="secondName"
              name="secondName"
              value={userData.secondName}
              type="text"
              required
              className="peer w-full  focus:outline-none focus:border-b-4 border-primary border-b p-2 mx-2"
              onChange={handleChange}
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
                ${userData.secondName ? "-top-4 text-sm text-primary" : ""}`}
              htmlFor="secondName"
            >
              الاسم الثانى
            </label>
            {errors.secondName && (
              <p className="text-red-500">{`*${errors.secondName}`}</p>
            )}
          </div>
          <div className="relative my-6">
            <input
              type="phoneNumber"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.phoneNumber}
              className="peer w-full  focus:outline-none focus:border-b-4 border-primary border-b p-2 mx-2"
              onChange={handleChange}
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
            peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
            ${userData.phoneNumber ? "-top-4 text-sm text-primary" : ""}`}
              htmlFor="phoneNumber"
            >
              {" "}
              رقم الهاتف
            </label>
            {errors.phoneNumber && (
              <p className="text-red-500">{`*${errors.phoneNumber}`}</p>
            )}
          </div>

          {/* city dropDown */}
          <div className="col-span-2 my-4">
            <select
              name="city"
              id="city"
              value={userData.city}
              onChange={handleChange}
              className="w-full border border-primary border-b p-2 mx-2"
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
          {/* grade dropDown */}
          <div className="col-span-2">
            <select
              name="gradeId"
              id="gradeId"
              onChange={handleChange}
              value={userData.gradeId}
              className="w-full border border-primary border-b p-2 mx-2"
              required
            >
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.gradeName}
                </option>
              ))}
            </select>
            {errors.gradeId && (
              <p className="text-red-500">{`*${errors.gradeId}`}</p>
            )}
          </div>
          <div className="relative my-6 col-span-2">
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="peer w-full focus:outline-none focus:border-b-4 border-primary border-b  p-2 mx-2"
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
                ${userData.email ? "-top-4 text-sm text-primary" : ""}`}
              htmlFor="email"
            >
              البريد الالكتروني
            </label>
            {errors.email && (
              <p className="text-red-500">{`*${errors.email}`}</p>
            )}
          </div>

          <div className="relative my-6 col-span-2">
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="peer w-full focus:outline-none focus:border-b-4 border-primary border-b  p-2 mx-2"
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
                ${userData.password ? "-top-4 text-sm text-primary" : ""}`}
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
              className="peer w-full focus:outline-none focus:border-b-4 border-primary border-b  p-2 mx-2"
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
                ${
                  userData.confirmedPassword
                    ? "-top-4 text-sm text-primary"
                    : ""
                }`}
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
          <button
            className="px-6 py-3 bg-primary hover:scale-125 duration-300"
            type="submit"
          >
            انشئ الحساب
          </button>
          <div className=" mt-4 col-span-2">
            يوجد لديك حساب بالفعل؟{" "}
            <Link to="/login" className="underline font-semibold text-red-500">
              ادخل إلى حسابك الآن !
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

// const Register = () => {
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState([]);
//   const [grades, setgrades] = useState([]);
//   const [userData, setuserData] = useState({
//     firstName: "",
//     secondName: "",
//     phoneNumber: "",
//     grade: "1",
//     city: "السويس",
//     email: "",
//     userPassword: "",
//   });

//   useEffect(() => {
//     Getgrades();
//   }, []);

//   const Getgrades = () => {
//     axios
//       .get("http://localhost:5020/api/grades")
//       .then((res) => {
//         setgrades(res.data);
//         console.log(res.data);
//       })
//       .catch((err) => console.log(err));
//   };
//   const handleChange = (e) => {
//     setuserData({
//       ...userData,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({}); // Clear previous errors

//     try {
//       const response = await axios.post(
//         "http://localhost:5020/api/Users/register",
//         userData
//       );
//       console.log(response.data);
//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//       if (error.response && error.response.data) {
//         // Map backend error structure to UI errors
//         let backendErrors = error.response.data;
//         if (typeof backendErrors === "string") {
//           // If backend returns a string error (e.g., username taken)
//           setErrors({ general: backendErrors });
//         } else if (Array.isArray(backendErrors)) {
//           // If backend returns an array of errors
//           const mappedErrors = {};
//           backendErrors.forEach((err) => {
//             if (err.code === "DuplicateUserName" || err.code === "DuplicateEmail") {
//               mappedErrors.email = "البريد الالكتروني مستخدم بالفعل";
//             } else if (err.description) {
//               mappedErrors[err.code?.toLowerCase() || "general"] = err.description;
//             }
//           });
//           setErrors(mappedErrors);
//         } else {
//           setErrors(backendErrors);
//         }
//       } else {
//         setErrors({ general: "حدث خطأ أثناء التسجيل. حاول مرة أخرى." });
//       }
//     }
//   };
//   const cities = [
//     "السويس",
//     "القاهرة",
//     "الجيزه",
//     "القلبوبيه",
//     "بنى سويف",
//     "الاسماعيلية",
//     "اسوان",
//     "الاسكندرية",
//     "اسيوط",
//     "الاقصر",
//   ];
//   return (
//     <div className="container mt-[85px]">
//       <div className="flex flex-col lg:flex-row ">
//         <div className="hidden lg:block lg:w-1/2 max-w-[400px]">
//           <img src="/teacher.jpg" alt="" />
//         </div>
//         <form
//           action=""
//           className="lg:w-1/2 py-10 lg:grid gap-4 grid-cols-2 p-2"
//           onSubmit={handleSubmit}
//         >
//           <h1 className="text-4xl font-bold my-6 text-primary col-span-2">
//             أنشء حسابك الآن :
//           </h1>
//           <div className="relative my-6">
//             <input
//               id="firstName"
//               name="firstName"
//               value={userData.firstName}
//               className="peer w-full focus:outline-none focus:border-b-4 border-primary border-b p-2 mx-2"
//               onChange={handleChange}
//               type="text"
//               required
//             />
//             <label
//               className={`absolute right-2
//                 top-2 transition-all duration-300
//                 peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
//                 ${userData.firstName ? "-top-4 text-sm text-primary" : ""}
//                `}
//               htmlFor="firstName"
//             >
//               الاسم الاول
//             </label>
//             {errors.firstName && (
//               <p className="text-red-500">{`*${errors.firstName}`}</p>
//             )}
//           </div>
//           <div className="relative my-6">
//             <input
//               id="secondName"
//               name="secondName"
//               value={userData.secondName}
//               type="text"
//               required
//               className="peer w-full  focus:outline-none focus:border-b-4 border-primary border-b p-2 mx-2"
//               onChange={handleChange}
//             />
//             <label
//               className={`absolute right-2 top-2 transition-all duration-300
//                 peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
//                 ${userData.secondName ? "-top-4 text-sm text-primary" : ""}`}
//               htmlFor="secondName"
//             >
//               الاسم الثانى
//             </label>
//             {errors.secondName && (
//               <p className="text-red-500">{`*${errors.secondName}`}</p>
//             )}
//           </div>
//           <div className="relative my-6">
//             <input
//               type="phoneNumber"
//               id="phoneNumber"
//               name="phoneNumber"
//               value={userData.phoneNumber}
//               className="peer w-full  focus:outline-none focus:border-b-4 border-primary border-b p-2 mx-2"
//               onChange={handleChange}
//               required
//             />
//             <label
//               className={`absolute right-2 top-2 transition-all duration-300
//             peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
//             ${userData.phoneNumber ? "-top-4 text-sm text-primary" : ""}`}
//               htmlFor="phoneNumber"
//             >
//               {" "}
//               رقم الهاتف
//             </label>
//             {errors.phoneNumber && (
//               <p className="text-red-500">{`*${errors.phoneNumber}`}</p>
//             )}
//           </div>

//           {/* city dropDown */}
//           <div className="col-span-2 my-4">
//             <select
//               name="city"
//               id="city"
//               value={userData.city}
//               onChange={handleChange}
//               className="w-full border border-primary border-b p-2 mx-2"
//               required
//             >
//               {cities.map((city, index) => (
//                 <option key={index} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </select>
//             {errors.city && <p className="text-red-500">{`*${errors.city}`}</p>}
//           </div>
//           {/* grade dropDown */}
//           <div className="col-span-2">
//             <select
//               name="grade"
//               id="grade"
//               onChange={handleChange} // Add onChange handler
//               value={userData.grade}
//               className="w-full border border-primary border-b p-2 mx-2"
//               required
//             >
//               {grades.map((grade) => (
//                 <option key={grade.id} value={grade.id}>
//                   {grade.gradeName}
//                 </option>
//               ))}
//             </select>
//             {errors.grade && (
//               <p className="text-red-500">{`*${errors.grade}`}</p>
//             )}
//           </div>

//           <div className="relative my-6 col-span-2">
//             <input
//               type="email"
//               id="email"
//               name="email"
//           <div className="relative my-6">
//             <input
//               type="password"
//               id="password"
//               name="userPassword"
//               value={userData.userPassword}
//               onChange={handleChange}
//               className="peer w-full focus:outline-none focus:border-b-4 border-primary border-b  p-2 mx-2"
//               required
//             />
//             <label
//               className={`absolute right-2 top-2 transition-all duration-300
//                 peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
//                 ${userData.userPassword ? "-top-4 text-sm text-primary" : ""}`}
//               htmlFor="password"
//             >
//               {" "}
//               كلمة السر
//             </label>
//             {errors.userPassword && (
//               <p className="text-red-500">{`*${errors.userPassword}`}</p>
//             )}
// //           </div>
//               type="password"
//           {errors.general && (
//             <p className="text-red-500 col-span-2">{`*${errors.general}`}</p>
//           )}
//           <button
//             className="px-6 py-3 bg-primary hover:scale-125 duration-300"
//             type="submit"
//           >
//             انشئ الحساب
//           </button>
//           <div className=" mt-4 col-span-2">
//             {" "}
//             يوجد لديك حساب بالفعل؟{" "}
//             <Link to="/login" className="underline font-semibold text-red-500">
//               {" "}
//               ادخل إلى حسابك الآن !
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
//           </div>

//           <button
//             className="px-6 py-3 bg-primary hover:scale-125 duration-300"
//             type="submit"
//           >
//             انشئ الحساب
//           </button>
//           <div className=" mt-4 col-span-2">
//             {" "}
//             يوجد لديك حساب بالفعل؟{" "}
//             <Link to="/login" className="underline font-semibold text-red-500">
//               {" "}
//               ادخل إلى حسابك الآن !
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

// //  {/* <div className="relative my-6">
// //             <input
// //               type="password"
// //               id="repassword"
// //               name="repassword"
// //               value={userData.repassword}
// //               onChange={handleChange}
// //               className="peer w-full focus:outline-none focus:border-b-4 border-primary border-b  p-2 mx-2"
// //               required
// //             />
// //             <label
// //               className={`absolute right-2 top-2 transition-all duration-300
// //                 peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
// //                 ${userData.repassword ? "-top-4 text-sm text-primary" : ""}`}
// //               htmlFor="repassword"
// //             >
// //               تاكيد كلمة السر
// //             </label>
// //             {/* {errors.repassword && <p className="text-red-500">{`${errors.repassword} *`}</p>} */}
// //             </div> */}
