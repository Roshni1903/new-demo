import React, { useState, useEffect } from "react";
import instance from "/src/component/axiosInstance.jsx";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";
// import { useLocation } from "react-router-dom";
import styles from "./student.module.css";
import { Link } from "react-router-dom";
export default function StudentDashboard() {
    const token = localStorage.getItem("token");
    const [allExam, setAllExam] = useState([]);
    const [loading, setLoading] = useState(false);
    // const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await instance.get("student/studentExam", {
                    headers: {
                        "access-token": token,
                    },
                });
                console.log(response);
                setAllExam(response.data.data);
                setLoading(false);
            } catch (e) {
                console.log(e);
                setLoading(false);

            }
            setLoading(false);

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
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Subject Name</th>
                                <th>Notes</th>
                                <th>Actions</th>
                                <th>Score</th>
                                <th>Rank</th>

                                <th>Result Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allExam.map((element) => (
                                <tr key={element._id}>
                                    <td>{element.subjectName}</td>
                                    {/* {element.notes.map((noteElement) => {
                                        return <td>{noteElement}</td>;
                                    })} */}
                                    <td>

                                        {element.notes.map((note, index) => (
                                            <li key={index}>{note}</li>
                                        ))}

                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link to={`/start-exam/${element._id}`}>
                                                <button
                                                    id={element._id}
                                                    className={styles.btn}
                                                    disabled={element.Result.length !== 0}
                                                >
                                                    Start Exam
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                    {element.Result.length > 0 ? (
                                        <>
                                            <td>{element.Result[0].score}</td>
                                            <td>{element.Result[0].rank}</td>
                                            <td>{element.Result[0].resultStatus}</td>
                                        </>
                                    ) : (
                                        <>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

//   "Result": []->empty array available
// Result
// :
// Array(1)
// 0
// :
// {_id: '6814c02237b3c500621c6b48', rank: 13, subjectName: 'C/C++', score: 3, resultStatus: 'Declared'}
// length
// :
// 1