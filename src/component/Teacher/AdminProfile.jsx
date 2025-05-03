import React from "react";
import { Link } from "react-router-dom";

export default function AdminProfile() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
                padding: "20px",
            }}
        >
            <h2>Profile</h2>
            <p>Name: Admin</p>
            <Link to="/reset-password">
                <button
                    style={{
                        backgroundColor: "#8E1616",

                        color: "#fff",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "10px"
                    }}
                >
                    Change Password
                </button>
            </Link>
        </div>
    );
}
