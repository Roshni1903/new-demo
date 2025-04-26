import React from "react";
import styles from "./login.module.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateData, clearData } from "../../../Redux/LoginSlice";
import instance from "../../axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DashBoard from "../../Dashboard";

export default function Login() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.login.data);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateData({ name: name, value: value }));
  };

  const submitData = async (data) => {
    try {
      const response = await instance({
        url: "users/Login",
        method: "POST",
        data,
      });
      if (response.status === 200) {
        toast(response.data.message, {
          position: "top-center",
          autoClose: 1000,
        });
        localStorage.setItem("token", response.data.data.token);
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitData(data);
    dispatch(clearData());
  };
  return (
    <>
      <div className={styles.flex}>
        <ToastContainer />
        <h1>Login</h1>
        <form className={styles.inner} onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button type="submit" className={styles.btn}>
            Login
          </button>
        </form>
        <p>
          Need an account?<Link to="/register">signup</Link>
        </p>
      </div>
    </>
  );
}
