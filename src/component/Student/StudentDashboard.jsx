import React from "react";
import { Outlet } from "react-router-dom";
export default function StudentDashboard() {
  return (
    <>
    <h1>Student</h1>
    <Outlet/>
    </>
  )
}
