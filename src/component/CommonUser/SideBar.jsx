import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.css"
const sidebar = {
  student: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
  ],
  teacher: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Students", path: "/students" },
    { name: "Profile", path: "/profile" },
  ],
};

export default function SideBar({ role }) {
  const dashArray = role === "teacher" ? sidebar.teacher : sidebar.student;

  return (
    <div className={styles.sidebar}>
      <h2>Exam Demo</h2>
      <ul>
        {dashArray.map((item, index) => (
          <li key={index}>
            <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to={item.path} >{item.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
