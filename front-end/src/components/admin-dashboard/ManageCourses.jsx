import { Outlet, NavLink } from "react-router-dom";

const ManageCourses = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Manage Courses</h2>

        {/* Navigation Tabs */}
        <nav className="grid grid-cols-2 sm:grid-cols-4 text-center gap-2 mb-6 border-b border-gray-600 pb-3">
          <NavLink
            to="addCourse"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600" : "bg-gray-700"}`
            }
          >
            Add full Course
          </NavLink>
          <NavLink
            to="add_Course"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600" : "bg-gray-700"}`
            }
          >
            Add Course
          </NavLink>
          <NavLink
            to="editCourse"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600" : "bg-gray-700"}`
            }
          >
            Edit Course
          </NavLink>
          <NavLink
            to="deleteCourse"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600" : "bg-gray-700"}`
            }
          >
            Delete Course
          </NavLink>
          </nav>
          <nav className="grid grid-cols-2 sm:grid-cols-4 text-center gap-2 mb-6 border-b border-gray-600 pb-3">
          <NavLink
            to="addWeek"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600" : "bg-gray-700"}`
            }
          >
            add week
          </NavLink>
          <NavLink
            to="updateWeek"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600" : "bg-gray-700"}`
            }
          >
            Update week
          </NavLink>
          <NavLink
            to="deleteWeek"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600" : "bg-gray-700"}`
            }
          >
            delete week
          </NavLink>
          </nav>
          <nav className="grid grid-cols-2 sm:grid-cols-4 text-center gap-2 mb-6 border-b border-gray-600 pb-3">
          <NavLink
            to="addLecture"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600" : "bg-gray-700"}`
            }
          >
            add Lecture
          </NavLink>
          <NavLink
            to="updateLecture"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600" : "bg-gray-700"}`
            }
          >
            update Lecture
          </NavLink>
          <NavLink
            to="deleteLecture"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600" : "bg-gray-700"}`
            }
          >
            delete Lecture 
          </NavLink>
          </nav>
          <nav className="grid grid-cols-2 sm:grid-cols-4 text-center gap-2 mb-6 border-b border-gray-600 pb-3">
          <NavLink
            to="addHomework"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600" : "bg-gray-700"}`
            }
          >
            add Homework 
          </NavLink>
          <NavLink
            to="deleteHomework"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600" : "bg-gray-700"}`
            }
          >
            delete Homework 
          </NavLink>
          <NavLink
            to="updateHomework"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600" : "bg-gray-700"}`
            }
          >
            update Homework 
          </NavLink>
        </nav>

        <Outlet />
      </div>
    </div>
  );
};

export default ManageCourses;
