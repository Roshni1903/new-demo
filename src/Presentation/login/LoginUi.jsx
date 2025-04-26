import React from "react";
import Login from "../../Container/login";
import styles from "/src/Presentation/login/login.module.css";
import { Link } from "react-router-dom";
import FormUi from "../FormUi";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx"
export default function LoginUi({ desc }) {
  const { loading, data, error, handleChange, validate, handleSubmit } =
    Login();

  return (
    <div className={styles.flex}>
      <ToastContainer />


      <div className={styles.con}>
        <div className={styles.left}>
          <h2>Welcome Back!</h2>
          <p>Enter your credentials to access your account.</p>

        </div>

        <form onSubmit={(e) => handleSubmit(e)} className={styles.inner}>
          <h1>Login</h1>
          {desc.map((element) => {
            return FormUi(element, data, error, handleChange, handleSubmit);
          })}
          {/* <button type="submit" className={loading ? styles.disable : styles.btn}>
          {loading ? "loading..." : "Login"}
        </button> */}

          {loading ? <LoadingSpinner /> : <button
            className={styles.btn}
            type="submit"
            disabled={loading}
          >
            Login
          </button>}
          <div className="links">
            <p>
              <Link to="/forget-password-link">forget password?</Link>
            </p>
            <p>
              Need an account?<Link to="/register">signup</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
