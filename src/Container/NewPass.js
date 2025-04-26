import { useNavigate } from "react-router-dom";
import newPassDesc from "../Description/newPassDesc";
import commonContainer from "./commonContainer";
import { toast } from "react-toastify";
import instance from "/src/component/axiosInstance.jsx";
import { setError, clearData } from "../Redux/FormReducer";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function NewPass() {
  const [loading, setLoading] = useState(false);

  const { data, error, handleChange, validate } = commonContainer(
    "newPass",
    newPassDesc
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search] = useSearchParams();
  const token = search.get("token");

  const submitData = async (data) => {
    setLoading(true);
    try {
      const response = await instance({
        url: `users/ForgotPassword/Verify?token=${token}`,
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
    dispatch(setError({ type: "newPass", error: newSubmit }));
    const hasError = Object.values(newSubmit).some((element) => element !== "");
    if (hasError) {
      e.preventDefault();
    } else {
      submitData(data);
      dispatch(clearData({ type: "newPass" }));
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
