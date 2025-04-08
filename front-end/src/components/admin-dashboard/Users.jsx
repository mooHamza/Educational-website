import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User_Context } from "../../Contexts/UserContext";

const Users = () => {
  const navigate = useNavigate();
  const { users } = useContext(User_Context);

  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    axios
      .delete(`http://localhost:5020/api/Users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  // const changeRole = (userId, newRole) => {
  //   axios
  //     .put(
  //       `http://localhost:8000/users/${userId}`,
  //       { role: newRole },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };
  return (
    <div className="p-6 bg-gray-800 text-gray-200 h-full " dir="ltr">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-auto">
          <thead>
            <tr className="bg-gray-700 ">
              <th className="py-2 px-4 text-left">id</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">phone</th>
              <th className="py-2 px-4 text-left">garde</th>
              <th className="py-2 px-4 text-left">city</th>
              <th className="py-2 px-4 text-left flex items-center">role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-700">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{`${user.firstName} ${user.secondName}`}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.phone}</td>
                <td className="py-2 px-4">{user.grade}</td>
                <td className="py-2 px-4">{user.city}</td>

                <td className="py-2 pt-5 px-4 flex items-center">
                  <p>{user.roles.map((role) => role.roleName).join(", ")}</p>
                </td>
                <td className="py-2 px-4">
                  <button className=" text-green-500 hover:underline">
                    {" "}
                    <Link to={`/admin-dashboard/Edit-user`} state={{ user }}>
                      Edit
                    </Link>
                  </button>
                  <button
                    onClick={() => deleteUser(user?.id)}
                    className=" text-red-500 hover:underline ml-2 "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
