import React from "react";
import styles from "./changeProfile.module.css";
import FormUi from "../FormUi";
import ChangeProfile from "../../Container/ChangeProfile";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";
export default function ChangeProfileUi({ desc }) {
    const { loading, data, error, handleChange, handleSubmit } = ChangeProfile();

    return (
        <div className={styles.flex}>
            <ToastContainer />
            <h1>Change Profile</h1>
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
                        submit
                    </button>
                )}
            </form>
        </div>
    );
}