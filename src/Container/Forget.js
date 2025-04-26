// import { useNavigate } from "react-router-dom";
import ForgetDesc from "../Description/ForgetDesc";
import commonContainer from "./commonContainer";
import { toast } from "react-toastify";
import instance from "/src/component/axiosInstance.jsx";
import { setError, clearData } from "../Redux/FormReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
export default function Forget() {
  const [loading, setLoading] = useState(false);

  const { data, error, handleChange, validate } = commonContainer(
    "forget",
    ForgetDesc
  );
  const dispatch = useDispatch();

  const submitData = async (data) => {
    setLoading(true);
    try {
      const response = await instance({
        url: "/users/ForgotPassword",
        method: "POST",
        data,
      });
      if (response.data.message) {
        toast(response.data.message, {
          position: "top-center",
          autoClose: 1000,
        });
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
    dispatch(setError({ type: "forget", error: newSubmit }));
    const hasError = Object.values(newSubmit).some((element) => element !== "");
    if (hasError) {
      e.preventDefault();
    } else {
      submitData(data);
      dispatch(clearData({ type: "forget" }));
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
