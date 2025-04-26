import React from "react"
import SideBar from "./CommonUser/SideBar"
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  return (
    <>
      <SideBar role={role} />
      {token && role === "teacher" ? children[0] : children[1]}
    </>
  )

}
