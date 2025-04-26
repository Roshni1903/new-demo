import React from "react";
import styles from "./password.module.css";
import FormUi from "../FormUi";
import Forget from "../../Container/Forget";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx"
export default function ForgetPasswordUi({ desc }) {
  const { loading, data, error, handleChange, handleSubmit } = Forget();

  return (
    <div className={styles.flex}>
      <ToastContainer />
      <h1>Change password</h1>
      <form className={styles.inner}>
        {desc.map((element) => {
          return FormUi(element, data, error, handleChange);
        })}
        {/* <button
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
          className={loading ? styles.disable : styles.btn}
        >
          {loading ? "sending mail..." : "send mail"}
        </button> */}
          {loading?<LoadingSpinner/>:<button
                   onClick={(e) => {
                    handleSubmit(e);
                  }}
                  className={ styles.btn}
                  type="submit"
                  disabled={loading}
                >
                 send mail
                </button>}
      </form>
    </div>
  );
}
