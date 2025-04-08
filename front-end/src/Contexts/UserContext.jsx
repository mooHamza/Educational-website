import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const User_Context = createContext();

const UserContext = ({ children }) => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get("http://localhost:5020/api/Users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    getUsers();
  }, []);

  return (
    <User_Context.Provider
      value={{
        users,
      }}
    >
      {children}
    </User_Context.Provider>
  );
};

export default UserContext;
