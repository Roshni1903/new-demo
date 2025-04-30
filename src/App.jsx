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
import ProtectedRoute from "./component/Routes/ProtectedRoute";
import { useLocation } from "react-router-dom";
import Profile from "./component/CommonUser/Profile";
import CreateExam from "./component/Teacher/CreateExam"
import EditExam from "./component/Teacher/EditExam";
import Dashboard from "./component/CommonUser/Dashboard"
import TeacherLayout from "./component/Teacher/TeacherLayout";
import StudentLayout from "./component/Student/StudentLayout";
import PublicRoute from "./component/Routes/publicRoute";
export default function App() {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const hideNavbar = location.pathname === "/404";

  return (
    <>
      {hideNavbar ? null : <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginUi desc={loginDesc} />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterUi desc={registerDesc} />
            </PublicRoute>
          }
        />
        <Route
          path="/forget-password-link"
          element={<ForgetPasswordUi desc={ForgetDesc} />}
        ></Route>
        <Route
          path="/newPassword"
          element={<NewPasswordUi desc={newPassDesc} />}
        ></Route>
        <Route path="*" element={<Navigate to="/404" />}></Route>
        <Route path="/404" element={<h1>Page not found!</h1>} />
        <Route
          element={
            <ProtectedRoute>
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-exam" element={<CreateExam />} />
          <Route path="/edit-exam/:id" element={<EditExam />} />
          <Route path="/profile" element={<Profile />} />

        </Route>

        <Route
          element={
            <ProtectedRoute>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* <Route path="/create-exam" element={<CreateExam />} /> */}
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard role={role} />
            </ProtectedRoute>
          }
        ></Route> */}
        {/* <Route path="/edit-exam/:id" element={<EditExam />}></Route> */}
        {/* <Route path="/dashboard/profile" element={<Profile />}></Route> */}

      </Routes>
    </>
  );
}

//issues
//Token exists->out navbar create,logout
//if token->login and reg not accessible
//loc / and token navbar
//protected->login navbar login register dashboard
//public->