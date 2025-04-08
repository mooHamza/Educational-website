import React, { Children } from "react";
import Header from "../Header";
import DashHeader from "./DashHeader";
import Sidebar from "./Sidebar";

const dashLayout = ({ Children }) => {
  return (
    <div>
      <DashHeader />

      <div className="flex bg-blue-200">
        <Sidebar />

        <main className="flex-1 p-4 bg-gray-300">{Children}</main>
      </div>
    </div>
  );
};

export default dashLayout;
