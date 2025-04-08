import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BiSolidLeftArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Contexts/authContext";

const Weeks = ({ weeks, courseId }) => {
  const { user } = useContext(AuthContext);
  console.log(weeks);
  console.log(weeks[0].lectures[0].homeworks);
  const [userCourses, setUserCourses] = useState([]);
  console.log(userCourses);
  const [openWeeks, setOpenWeeks] = useState([]);
  const [openLectures, setOpenLectures] = useState([]);

  const toggleLecture = (index) => {
    if (openLectures.includes(index)) {
      setOpenLectures(openLectures.filter((i) => i !== index));
    } else setOpenLectures([...openLectures, index]);
  };
  const toggleWeeks = (index) => {
    if (openWeeks.includes(index)) {
      setOpenWeeks(openWeeks.filter((i) => i !== index));
    } else setOpenWeeks([...openWeeks, index]);
  };

  const getUserCourses = () => {
    axios
      .get(`http://localhost:5020/api/Users/${user.Id}/courses`)
      .then((res) => setUserCourses(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (user) {
      getUserCourses();
    }
  }, []);

  const isBooked = userCourses.some((course) => {
    return course.id === courseId;
  });

  return (
    <div className="py-4">
      <h1 className="text-4xl font-bold my-10">محتوى الكورس</h1>
      {/* list of courses  */}
      {!weeks ? (
        <div>....looding</div>
      ) : (
        weeks?.map((week, weekIndex) => (
          <ul key={week.id}>
            <li
              className=" bg-white p-4 rounded-md"
              style={{ boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
            >
              {/* week intro */}
              <div className="flex items-center justify-between p-4 rounded-md bg-[#efefef]">
                <div>
                  <h2 className="font-bold text-2xl mb-2">
                    {" "}
                    الاسبوع رقم {week.weekNumber}
                  </h2>
                  <p>{week.content}</p>
                </div>
                <IoIosArrowDown
                  onClick={() => toggleWeeks(weekIndex)}
                  className={`cursor-pointer transform transition-transform duration-300 ${
                    openWeeks.includes(weekIndex) ? "rotate-180" : ""
                  }`}
                />
              </div>
              {/*list of hidden week lectures */}
              <div
                className={`transition-[max-height] duration-500 overflow-hidden ${
                  openWeeks.includes(weekIndex) ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                {week.lectures.map((lecture, lectureIndex) => (
                  <ul
                    key={lecture.id}
                    className={` rounded-md bg-[#efefef] p-4 mt-2`}
                  >
                    {/* first lecture */}
                    <li>
                      <div
                        className={` my-3 p-4 flex items-center justify-between  bg-white rounded-md shadow-md`}
                      >
                        <div className="rounded-md">
                          <h2>{lecture.name}</h2>
                        </div>
                        <IoIosArrowDown
                          onClick={() => toggleLecture(lectureIndex)}
                          className={`cursor-pointer transform transition-transform duration-300 ${
                            openLectures.includes(lectureIndex)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                      {/* hidden details of first class */}
                      <div
                        className={`transition-[max-height] duration-500 overflow-hidden ${
                          openLectures.includes(lectureIndex)
                            ? "max-h-[1000px]"
                            : "max-h-0"
                        }`}
                      >
                        <div className={` p-4 bg-gray-300 rounded-md`}>
                          <div className="underline font-semibold flex items-center gap-3">
                            <BiSolidLeftArrow />
                            {!user ? (
                              <>
                                <p>يجب شراء الكورس لتتمكن من مشاهدة الدرس</p>
                                <p>
                                  تواصل مع رقم 01551076718 لتحديد طريقة الدفع
                                </p>
                              </>
                            ) : isBooked ||
                              (Array.isArray(user.role)
                                ? user.role
                                : [user.role]
                              ).some((role) => role == "Admin") ? (
                              <Link
                                to="/seeVideo"
                                onClick={() => console.log(lecture.video)}
                                state={lecture.url}
                              >
                                مشاهدة الفيديو
                              </Link>
                            ) : (
                              <>
                                <p>يجب شراء الكورس لتتمكن من مشاهدة الدرس</p>
                                <p>
                                  تواصل مع رقم 01551076718 لتحديد طريقة الدفع
                                </p>
                              </>
                            )}
                          </div>
                          {lecture.homeworks.map((homework) => (
                            <div
                              key={homework.id}
                              className="underline font-semibold flex items-center gap-3"
                            >
                              <BiSolidLeftArrow />

                              {!user ? (
                                <>
                                  <p>يجب شراء الكورس لتتمكن من حل الواجب</p>
                                  <p>
                                    تواصل مع رقم 01551076718 لتحديد طريقة الدفع
                                  </p>
                                </>
                              ) : isBooked ||
                                (Array.isArray(user.role)
                                  ? user.role
                                  : [user.role]
                                ).some((role) => role == "Admin") ? (
                                <Link to={`/homework`} state={{ homework }}>
                                  {" "}
                                  الواجب
                                </Link>
                              ) : (
                                <>
                                  <p>يجب شراء الكورس لتتمكن من حل الواجب</p>
                                  <p>
                                    تواصل مع رقم 01551076718 لتحديد طريقة الدفع
                                  </p>
                                </>
                              )}
                            </div>
                          ))}

                          {/* <div className="underline font-semibold flex items-center gap-3">
                            <BiSolidLeftArrow />
                            {user ? (
                              <Link
                                to={`/course/${courseId}/weeks/${week.id}/lecs/${lecture.id}/homework`}
                              >
                                {" "}
                                الواجب
                              </Link>
                            ) : (
                              <Link to="/login">الواجب</Link>
                            )}
                          </div> */}
                        </div>
                      </div>
                    </li>
                    <li></li>
                  </ul>
                ))}
              </div>
            </li>
          </ul>
        ))
      )}
    </div>
  );
};

export default Weeks;
