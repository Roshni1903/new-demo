import { useNavigate } from "react-router-dom";
import loginDesc from "../Description/loginDesc";
import commonContainer from "./commonContainer";
import { toast } from "react-toastify";
import instance from "/src/component/axiosInstance.jsx";
import { setError, clearData, setToken } from "../Redux/FormReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
export default function Login() {
  const [loading, setLoading] = useState(false);

  const { data, error, handleChange, validate } = commonContainer(
    "login",
    loginDesc
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitData = async (data) => {
    setLoading(true);
    try {
      const response = await instance({
        url: "users/Login",
        method: "POST",
        data,
      });
      console.log(response);
      if (response.data.message) {
        toast(response.data.message, {
          position: "top-center",
          autoClose: 1000,
        });
      }
      if (response.data.statusCode === 200) {
        localStorage.setItem("role", response.data.data.role);
        localStorage.setItem("token", response.data.data.token);

        dispatch(setToken({ "token": localStorage.getItem('token') }))
        navigate("/dashboard");
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
    dispatch(setError({ type: "login", error: newSubmit }));
    const hasError = Object.values(newSubmit).some((element) => element !== "");
    if (hasError) {
      e.preventDefault();
    } else {
      submitData(data);
      dispatch(clearData({ type: "login" }));
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
