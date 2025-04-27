import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar/NavBar";
import RegisterUi from "/src/Presentation/registration/RegisterUi.jsx";
import registerDesc from "/src/Description/registerDesc.js";
import LoginUi from "./Presentation/login/LoginUi";
import loginDesc from "/src/Description/loginDesc.js";
import ForgetDesc from "./Description/ForgetDesc";
import ForgetPasswordUi from "./Presentation/ForgetPassword/ForgetPasswordUi";
import newPassDesc from "./Description/newPassDesc";
import NewPasswordUi from "./Presentation/ResetPassword/NewPasswordUi";
import ProtectedRoute from "./component/ProtectedRoute";
import DashBoard from "./component/CommonUser/Dashboard";
import { useLocation } from "react-router-dom";
import CreateExam from "./component/Teacher/CreateExam";
import Profile from "./component/CommonUser/Profile";

export default function App() {
  const location = useLocation();
  const role = localStorage.getItem('role')
  const hideNavbar = location.pathname === "/404";

  return (
    <>

      {hideNavbar ? null : <Navbar />}

      <Routes>
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="/" element={<LoginUi desc={loginDesc} />}></Route>
        <Route
          path="/register"
          element={<RegisterUi desc={registerDesc} />}
        ></Route>
        <Route
          path="/forget-password-link"
          element={<ForgetPasswordUi desc={ForgetDesc} />}
        ></Route>
        <Route
          path="/newPassword"
          element={<NewPasswordUi desc={newPassDesc} />}
        ></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard role={role} />
            </ProtectedRoute>
          }
        >
        </Route>
        <Route path="*" element={<Navigate to="/404" />}></Route>
        <Route path="/404" element={<h1>Page not found!</h1>} />
        <Route
          path="/dashboard/profile"
          element={<Profile />}
        ></Route>
      </Routes>
    </>
  );
}



