import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "/src/component/axiosInstance.jsx";
import { Link } from "react-router-dom";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get("student/getStudentDetail", {
          headers: {
            "access-token": token,
          },
        });
        const { name, email, role } = response.data.data;
        setProfile({ name, email, role });
        setLoading(false);
      } catch (e) {
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 1000,
        });
        setLoading(false);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#8E1616",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none"
  };

  return (
    <>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <LoadingSpinner />
        </div>
      ) : (
        <div
          style={{
            maxWidth: "400px",
            margin: "40px auto",
            padding: "20px",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Profile</h2>
          <p style={{ margin: "10px 0" }}>Name: {profile.name}</p>
          <p style={{ margin: "10px 0" }}>Email: {profile.email}</p>
          <p style={{ margin: "10px 0" }}>Role: {profile.role}</p>
          <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
            <Link to="/edit-profile" style={buttonStyle}>
              Edit Profile
            </Link>
            <Link to="/reset-password" style={buttonStyle}>
              Change Password
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
