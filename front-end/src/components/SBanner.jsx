import React from "react";
import Einstein_1 from "../images/Einstein_1.png";
import blue_background from "../images/blue_background.jpg";
import { useNavigate } from "react-router-dom";
const SBanner = () => {
  const navigate = useNavigate()
  return (
    <div
      className={`pt-8 bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${blue_background})` }}
    >
      <div className="container flex flex-col-reverse sm:flex-row items-center">
        <div className="image sm:w-1/2 h-[450px]">
          <img className="w-full h-full " src={Einstein_1} alt="img" />
        </div>
        {/* text */}
        <div className="sm:w-1/2 md:px-8 py-10">
          <h1 className="text-6xl font-extrabold text-primary mb-4">
            ليه اينشتاين ؟
          </h1>
          <p className="max-w-[300px] font-semibold text-subwhite">
            لأن طلبة كتير بتواجه صعوبة في فهم الفيزياء وحل المسائل وفرتلك في
            منصة اينشتاين كل الي نفسك فيه عشان اخليلك المادة بسيطة ومُمتعة
          </p>
          <div>
            <button 
            onClick={()=>navigate("/register")}
            className="px-6 py-3 mt-12 font-bold bg-primary rounded-sm hover:scale-125 duration-500 ">
              اشترك الان
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SBanner;
