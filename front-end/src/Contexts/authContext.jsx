import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { replace, useNavigate } from "react-router-dom";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const getUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login", { replace: true });  };
  return (
    <AuthContext.Provider value={{ user, getUserData, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
