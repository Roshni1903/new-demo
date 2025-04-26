import React, { useState } from "react";
import styles from "./newPass.module.css";
import FormUi from "../FormUi";
import { ToastContainer } from "react-toastify";
import NewPass from "../../Container/NewPass";
export default function NewPasswordUi({ desc }) {
  const { loading, data, error, handleChange, handleSubmit } = NewPass();
  return (
    <div className={styles.flex}>
      <ToastContainer />
      <h1>set new password</h1>
      <form className={styles.inner}>
        {desc.map((element) => {
          return FormUi(element, data, error, handleChange);
        })}
        <button
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
          className={loading ? styles.disable : styles.btn}
        >
          {loading ? "processing..." : "set password"}
        </button>
      </form>
    </div>
  );
}
