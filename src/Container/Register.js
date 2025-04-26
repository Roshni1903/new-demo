import { useNavigate } from "react-router-dom";
import registerDesc from "../Description/registerDesc";
import commonContainer from "./commonContainer";
import { toast } from "react-toastify";
import instance from "/src/component/axiosInstance.jsx";
import { setError, clearData, setLoading } from "../Redux/FormReducer";
import { useDispatch } from "react-redux";
import { React, useState } from "react";
export default function Register() {
  const [loading, setLoading] = useState(false);

  const { data, error, handleChange, validate } = commonContainer(
    "register",
    registerDesc
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitData = async (data) => {
    setLoading(true);
    try {
      const response = await instance({
        url: "users/SignUp",
        method: "POST",
        data,
      });
      if (response.data.message) {
        toast(response.data.message, {
          position: "top-center",
          autoClose: 1000,
        });
      }
      if (response.data.statusCode === 200) {
        navigate("/");
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
    dispatch(setError({ type: "register", error: newSubmit }));
    const hasError = Object.values(newSubmit).some((element) => element !== "");
    if (hasError) {
      e.preventDefault();
    } else {
      submitData(data);
      dispatch(clearData({ type: "register" }));
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
