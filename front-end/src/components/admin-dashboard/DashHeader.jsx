import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineViewList } from "react-icons/hi";

const DashHeader = ({
  isSidebarOpen,
   setIsSidebarOpen 
  }) => {
  return (
    <div className="header flex items-center justify-between px-4 py-8 bg-gray-900 text-gray-200">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>

      {!isSidebarOpen && <div onClick={() => setIsSidebarOpen((prev) => !prev)} className="ml-4">
        <HiOutlineViewList className="text-2xl" />
      </div>}
    </div>
  );
};

export default DashHeader;
