import React from "react";
import { useNavigate } from "react-router-dom";
const FBanner = () => {
  const navigate = useNavigate()
  return (
    <div className=" container flex flex-col sm:flex-row items-center py-6">
      <div className="text sm:w-1/2 md:px-8 py-10">
        <h1 className="text-4xl font-bold">ا / </h1>
        <h1 className="text-6xl font-bold text-primary">محمد حمزه</h1>
        <p className="font-semibold text-2xl p-2">منصتك فى عالم الفزياء ...</p>
        <p className="font-semibold text-2xl pr-2 ">بيتك ومطرحك</p>
        <div className="text-center sm:text-start">
          <button 
          onClick={()=>navigate("/register")}
          className="text-lg font-bold px-6 py-3 mt-10 rounded bg-primary hover:scale-125 duration-500 ">
            اشترك الان
          </button>
        </div>
      </div>
      <div className="image sm:w-1/2">
        <img className="w-full " src="/teacher.jpg" alt="teacher" />
      </div>
    </div>
  );
};

export default FBanner;
