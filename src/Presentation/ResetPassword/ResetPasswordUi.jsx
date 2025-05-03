import React, { useState } from "react";
import styles from "./resetPass.module.css";
import FormUi from "../FormUi";
import { ToastContainer } from "react-toastify";
import ResetPassword from "../../Container/ResetPassword";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";
export default function ResetPasswordUi({ desc }) {
    const { loading, data, error, handleChange, handleSubmit } = ResetPassword();
    return (
        <div className={styles.flex}>
            <ToastContainer />
            <h1>set new password</h1>
            <form className={styles.inner}>
                {desc.map((element) => {
                    return FormUi(element, data, error, handleChange);
                })}

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <button
                        onClick={(e) => {
                            handleSubmit(e);
                        }}
                        className={styles.btn}
                        type="submit"
                        disabled={loading}
                    >
                        change Password
                    </button>
                )}
            </form>
        </div>
    );
}