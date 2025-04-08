import React, { useContext, useEffect, useState } from "react";
import monthBannner from "../images/monthBannner.avif";
import SBanner from "../components/SBanner";
import FBanner from "../components/FBanner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Courses_Context } from "../Contexts/CoursesContext";
import axios from "axios";

const MonthsList = () => {
  const { grade } = useParams();
  const { courses } = useContext(Courses_Context);
  const CoursesToShow = courses?.filter((course) => course.gradeName === grade);
  console.log(CoursesToShow);
  return (
    <div className="mt-[85px]">
      <FBanner />
      <SBanner />
      {CoursesToShow.length <= 0 ? (
        <h1 className="p-3 text-xl font-bold text-white bg-blue-600">
          سيتم اضافة الكورسات قريبا
        </h1>
      ) : (
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {CoursesToShow.map((course) => (
            <div key={course.id} className="p-2 flex-grow ">
              {/* Card 1 */}
              <div className="group hover:translate-y-2 transition duration-300 border-2 border-primary rounded-lg py-4  px-10">
                {/* Image */}
                <div className="h-[200px] text-center group-hover:scale-x-125 group-hover:scale-y-105 duration-300 ">
                  <img
                    src={monthBannner}
                    alt="course-2-banner"
                    className="  h-full  rounded-md"
                  />
                </div>
                {/* Content */}

                {/* title of course*/}
                <h3 className="text-lg font-bold my-2">{course.name}</h3>
                <p className="text-center">
                  المحتوى {course.weeks.length} اسابيع
                </p>
                {/* weeks content */}
                <p className="text-sm text-gray-600 py-2">
                  {course?.weeks?.map((week, index) => (
                    <div key={week.id}>{`${index + 1}-  ${week.content}`}</div>
                  ))}
                </p>
                {/* buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/courseDetails/${course.id}`}
                    className=" px-4 py-2 text-center hover:bg-blue-500 hover:text-white
                 rounded-full border-2 border-blue-500"
                  >
                    الدخول للكورس
                  </Link>
                  <button className="px-4 py-2 text-center bg-primary rounded-full hover:scale-105 duration-300 ">
                    اشترى الان{" "}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MonthsList;
