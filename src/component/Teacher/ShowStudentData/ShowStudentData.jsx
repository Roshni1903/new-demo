import React, { useEffect, useState } from "react";
import instance from "/src/component/axiosInstance.jsx";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";
import { Link } from "react-router-dom";
import styles from "./showStudentData.module.css";
export default function ShowStudentData() {
    const token = localStorage.getItem("token");
    const [students, setStudents] = useState([]);
    const [showVerified, setVerified] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await instance.get("dashboard/Teachers", {
                    headers: {
                        "access-token": token,
                    },
                });
                // console.log(response.data);
                setStudents(response.data.data);
                setLoading(false);
            } catch (e) {
                console.log(e);
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
    }, []);

    const showVerifiedStudent = async () => {
        setLoading(true);
        setToggle(true);
        try {
            const response = await instance.get("dashboard/Teachers/StudentForExam", {
                headers: {
                    "access-token": token,
                },
            });
            setVerified(response.data.data);
            setLoading(false);
        } catch {
            console.log(e);
            toast.error("Something went wrong!", {
                position: "top-center",
                autoClose: 1000,
            });
            setLoading(false);
        }
    };

    const showAllStudent = () => {
        setToggle(false);
    };
    return (
        <>
            {loading ? (
                <div className={styles.spinnerContainer}>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className={styles.container}>
                    <div>
                        <h1>All Students</h1>
                        <button onClick={showAllStudent} className={styles.btn}>
                            Show all students
                        </button>
                        <button onClick={showVerifiedStudent} className={styles.btn}>
                            Verified students for exam
                        </button>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(toggle ? showVerified : students).map((studentElement) => (
                                <tr key={studentElement._id}>
                                    <td>{studentElement.name}</td>
                                    <td>{studentElement.email}</td>
                                    <td>{studentElement.status}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link to={`/view-student-detail/${studentElement._id}`}>
                                                <button className={styles.btn}>
                                                    view student detail
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}