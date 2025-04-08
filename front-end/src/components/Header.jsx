import React, { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { FaListUl } from "react-icons/fa";
import { AuthContext } from "../Contexts/authContext";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);
  return (
    <div className="fixed w-full top-0 left-0 z-10 bg-white flex items-center justify-between p-4 shadow-md">
      {/* List icon for small screens */}
      {!user && (
        <div onClick={() => setShowList((prev) => !prev)} className="sm:hidden">
          <FaListUl className="text-lg" />
        </div>
      )}

      {/* Right side register & login */}
      {!user && (
        <div className="hidden sm:flex gap-4">
          <Link to="/register">
            <div
              className="flex gap-3 items-center group px-4 py-2 bg-primary
             rounded-md hover:bg-transparent border-primary border-2"
            >
              <FaHome className="text-xl group-hover:text-primary" />
              انشئ حسابك
            </div>
          </Link>
          <Link to="/login">
            <div className="flex items-center gap-3 transition-all duration-700 hover:shadow-xl px-4 py-2 rounded-md">
              <BiLogIn className="text-xl" />
              تسجيل الدخول
            </div>
          </Link>
        </div>
      )}
      <div className="flex items-center gap-4">
        {user && (
          <button
            onClick={logOut}
            className="text-lg font-semibold bg-primary rounded-md px-4 py-2"
          >
            log out
          </button>
        )}
        {user &&
          (Array.isArray(user.role) ? user.role : [user.role]).some(
            (role) => role === "Admin"
          ) && (
            <div className="text-lg font-semibold bg-primary rounded-md px-4 py-2">
              <Link to="/admin-dashboard">Admin Dashboard</Link>
            </div>
          )}
      </div>
      {/* Left side logo */}
      <h1 className="font-semibold text-2xl cursor-pointer">
        <Link to="/">Einstein</Link>
      </h1>

      {/* Dropdown for small screens */}
      {!user && (
        <ul
          className={`${
            showList ? "block" : "hidden"
          } sm:hidden p-4 bg-cyan-600 absolute top-full w-full left-0 rounded-md`}
        >
          <li className="mb-4 bg-cyan-800 hover:bg-cyan-900 rounded-lg p-3 text-white">
            <Link to="/register">انشئ حسابك</Link>
          </li>
          <li className="bg-cyan-800 hover:bg-cyan-900 rounded-lg p-3 text-white">
            <Link to="/login">تسجيل الدخول</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
