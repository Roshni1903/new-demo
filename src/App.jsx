import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AdminDashboard from "./component/Teacher/AdminDashboard";
import StudentDashboard from "./component/Student/StudentDashboard";
import Profile from "./component/CommonUser/Profile";
import CreateExam from "./component/Teacher/CreateExam";
export default function App() {
  return (
    <>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Navbar />

        <Routes>
          <Route path="createExam" element={<CreateExam />} />
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
                <AdminDashboard />
                <StudentDashboard />
              </ProtectedRoute>
            }
          >

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}



