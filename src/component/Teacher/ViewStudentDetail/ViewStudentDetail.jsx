import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./viewStudentDetail.module.css";
import instance from "/src/component/axiosInstance.jsx";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";

export default function ViewStudentDetail() {
    const [studentDetail, setStudentDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await instance.get(
                    `dashboard/Teachers/viewStudentDetail?id=${id}`,
                    {
                        headers: {
                            "access-token": token,
                        },
                    }
                );
                console.log(response.data);
                setStudentDetail(response.data.data);

                setLoading(false);
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        };
        if (token) {
            fetchData();
        }
    }, []);
    return (
        <>
            {loading ? (
                <div className={styles.spinnerContainer}>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className={styles.container}>
                    {studentDetail.map((element) => (
                        <>
                            <h2>Name:{element.name}</h2>
                            <h2>Email:{element.email}</h2>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Subject Name</th>
                                        <th>Result Status</th>
                                        <th>Score</th>
                                        <th>Rank</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {element.Result.map((element) => (
                                        <tr key={element._id}>
                                            <td>{element.subjectName}</td>
                                            <td>{element.resultStatus}</td>
                                            <td>{element.score}</td>
                                            <td>{element.rank}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ))}
                </div>
            )}
        </>
    );
}
// rank: 7;
// resultStatus: "Declared";
// score: 1;
// subjectName: "English";