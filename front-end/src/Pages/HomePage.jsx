import React from "react";
import FBanner from "../components/FBanner";
import SBanner from "../components/SBanner";
import YearsList from "../components/YearsList";

const HomePage = () => {
  return (
    <div className="mt-[76px]">
      <FBanner />
      <SBanner />
      <div className="flex justify-center">
       <div>
       <h1 className="text-4xl font-bold my-6 ">الصفوف الدراسية</h1>
       <hr className="h-[4px] bg-primary " />
       </div>
      </div>
      <YearsList />
    </div>
  );
};

export default HomePage;
