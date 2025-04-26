import React from "react";
import { useNavigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (role === "teacher") {
    return children[0];
  } else {
    return children[1];
  }
}
