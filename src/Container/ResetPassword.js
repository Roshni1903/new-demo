import { useNavigate } from "react-router-dom";
import commonContainer from "./commonContainer";
import { toast } from "react-toastify";
import instance from "/src/component/axiosInstance.jsx";
import { setError, clearData } from "../Redux/FormReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import resetPassDesc from "../Description/resetPassDesc";
export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { data, error, handleChange, validate } = commonContainer(
        "resetPassword",
        resetPassDesc
    );
    const dispatch = useDispatch();

    const submitData = async (data) => {
        setLoading(true);
        try {
            const response = await instance({
                url: "users/ResetPassword",
                method: "POST",
                headers: {
                    "access-token": token,
                },
                data,
            });
            if (response.data.statusCode === 200) {
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                });

                setTimeout(() => {
                    navigate("/dashboard")

                }, 1200);
            }
            setLoading(false);
        } catch (e) {
            toast.error("something went wrong!", {
                position: "top-center",
                autoClose: 1000,
            });
            setLoading(false);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newSubmit = {};
        Object.entries(data).forEach(([name, value]) => {
            const submitError = validate(name, value);
            Object.assign(newSubmit, submitError);
        });
        dispatch(setError({ type: "resetPassword", error: newSubmit }));
        const hasError = Object.values(newSubmit).some((element) => element !== "");
        if (hasError) {
            e.preventDefault();
        } else {
            submitData(data);
            dispatch(clearData({ type: "resetPassword" }));
        }
    };
    return {
        loading,
        data,
        error,
        handleChange,
        validate,
        handleSubmit,
    };
}