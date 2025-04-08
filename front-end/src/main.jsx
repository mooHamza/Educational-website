import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import CoursesContext from "./Contexts/CoursesContext.jsx";
import AuthProvider from "./Contexts/authContext.jsx";
import GradesContext from "./Contexts/GradesContext.jsx";
import UserContext from "./Contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Router>
    <AuthProvider>
      <GradesContext>
    <UserContext>
      <CoursesContext>
        <App />
      </CoursesContext>
    </UserContext>
    </GradesContext>
    </AuthProvider>
      </Router>
  </StrictMode>
);
