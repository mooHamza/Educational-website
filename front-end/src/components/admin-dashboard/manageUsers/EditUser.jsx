import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
/*
  The Update_User_Dto model expects:
    - Email (string)
    - FirstName (string)
    - SecondName (string)
    - City (string)
    - Phone (string)
    - GradeId (int, nullable)
    - Roles (IList<string>)

  This component sends these fields in the PUT request body as JSON.
  The roles are sent as an array of strings (role names).
*/
/*
  To update the additional fields (UserName and GradeId),
  add them to the userData state and handle them in the form and submission logic.
  You may also want to add corresponding input fields for GradeId if needed.
*/

// Add UserName and GradeId to userData state initialization
// Also, add them to the form and handleChange logic

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  console.log(user);

  const [roles, setRoles] = useState([]);
  const [userData, setUserData] = useState({
    firstName: user?.firstName || "",
    SecondName: user?.secondName || "",
    email: user?.email || "",
    roles: user?.roles ? user.roles.map((role) => role.roleName) : [],
    phone: user?.phone || "",
    city: user?.city || "",
    GradeId: user?.gradeId || "",
  });

  const getRoles = () => {
    axios
      .get("http://localhost:5020/api/Role")
      .then((res) => {
        console.log(res.data);
        setRoles(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getRoles();
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData.roles);
    // Prepare payload with correct property names and filter out any falsy roles
    const payload = {
      Email: userData.email,
      FirstName: userData.firstName,
      SecondName: userData.SecondName,
      City: userData.city,
      Phone: userData.phone,
      GradeId: userData.GradeId ? Number(userData.GradeId) : null,
      Roles: Array.isArray(userData.roles)
        ? userData.roles.filter((role) => !!role)
        : [],
    };

    axios
      .put(`http://localhost:5020/api/Users/${user.id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUserData({
          firstName: "",
          SecondName: "",
          email: "",
          roles: [],
          phone: "",
          city: "",
          GradeId: "",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gray-800 p-6 h-full" dir="ltr">
      <h2 className="text-xl font-bold mb-4 text-gray-200">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200 font-semibold">Name</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-200 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200 font-semibold">
            Second Name
          </label>
          <input
            type="text"
            name="SecondName"
            value={userData.SecondName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-200 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200 font-semibold">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-200 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200 font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-200 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200 font-semibold">
            Grade Id
          </label>
          <input
            type="text"
            name="GradeId"
            value={userData.GradeId}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-200 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200 font-semibold">City</label>
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-200 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200 font-semibold">
            Roles
          </label>
          <div className="flex flex-col">
            {roles.map((role) => (
              <label key={role.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={role.roleName}
                  checked={userData.roles.includes(role.roleName)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setUserData((prev) => ({
                      ...prev,
                      roles: checked
                        ? [...prev.roles, role.roleName]
                        : prev.roles.filter((r) => r !== role.roleName),
                    }));
                  }}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span className="text-gray-200">{role.roleName}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin-dashboard/users")}
            className="mr-2 text-red-500"
          >
            Cancel
          </button>
          <button type="submit" className="text-green-500">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
// const EditUser = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = location.state?.user;
//   console.log(user);

//   const [roles, setRoles] = useState([]);
//   const [userData, setUserData] = useState({
//     firstName: user?.firstName || "",
//     SecondName: user?.secondName || "",
//     email: user?.email || "",
//     roles: user?.roles ? user.roles.map((role) => role.roleName) : [],
//     phone: user?.phone || "",
//     city: user?.city || "",
//   });

//   const getRoles = () => {
//     axios
//       .get("http://localhost:5020/api/Role")
//       .then((res) => {
//         console.log(res.data);
//         setRoles(res.data);
//       })
//       .catch((err) => console.log(err));
//   };
//   useEffect(() => {
//     getRoles();
//   }, []);

//   const handleChange = (e) => {
//     setUserData({
//       ...userData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formattedRoles = userData.roles.map((roleName) => ({ roleName }));

//     axios
//       .put(
//         `http://localhost:5020/api/Users/${user.id}`,
//         {
//           ...userData,
//           roles: formattedRoles,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res);
//         setUserData({
//           firstName: "",
//           SecondName: "",
//           email: "",
//           roles: [],
//           phone: "",
//           city: "",
//         });
//       })
//       .catch((err) => console.log(err));

//     // onSave(userData); // Call the onSave function with updated user data
//   };

//   return (
//     <div className="bg-gray-800 p-6 h-full" dir="ltr">
//       <h2 className="text-xl font-bold mb-4 text-gray-200">Edit User</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block mb-1 text-gray-200 font-semibold">Name</label>
//           <input
//             type="text"
//             name="firstName"
//             value={userData.firstName}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 text-gray-200 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 text-gray-200 font-semibold">
//             Second Name
//           </label>
//           <input
//             type="text"
//             name="SecondName"
//             value={userData.SecondName}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 text-gray-200 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 text-gray-200 font-semibold">
//             Phone
//           </label>
//           <input
//             type="text"
//             name="phone"
//             value={userData.phone}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 text-gray-200 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 text-gray-200 font-semibold">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={userData.email}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 text-gray-200 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 text-gray-200 font-semibold">
//             Roles
//           </label>
//           <div className="flex flex-col">
//             {roles.map((role) => (
//               <label key={role.id} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   value={role.roleName}
//                   checked={userData.roles.includes(role.roleName)} // Fix condition
//                   onChange={(e) => {
//                     const checked = e.target.checked;
//                     setUserData((prev) => ({
//                       ...prev,
//                       roles: checked
//                         ? [...prev.roles, role.roleName]
//                         : prev.roles.filter((r) => r !== role.roleName),
//                     }));
//                   }}
//                   className="form-checkbox h-5 w-5 text-blue-500"
//                 />
//                 <span className="text-gray-200">{role.roleName}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={() => navigate("/admin-dashboard/users")}
//             className="mr-2 text-red-500"
//           >
//             Cancel
//           </button>
//           <button type="submit" className="text-green-500">
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditUser;
