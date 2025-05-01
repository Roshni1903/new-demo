import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "/src/component/axiosInstance.jsx";
import styles from "./StartExam.module.css";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";
import { toast, ToastContainer } from "react-toastify";

export default function StartExam() {
    const token = localStorage.getItem("token");
    const { id } = useParams();

    const [getExam, setExam] = useState([]);
    const [curIndex, setCurIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState([]);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await instance.get(`student/examPaper?id=${id}`, {
                    headers: {
                        "access-token": token,
                    },
                });
                console.log(response)
                setExam(response.data.data);
                setLoading(false);
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [id, token]);

    const handleRadio = (questionId, value) => {
        const updatedAnswers = [...answer];
        updatedAnswers[curIndex] = { question: questionId, answer: value };
        setAnswer(updatedAnswers);
        setEdit(true);
    };

    const handleNext = () => {
        if (edit) {
            toast.error("Please save changes before moving to the next question.", {
                position: "top-center",
                autoClose: 1000,
            });
            return;
        }
        setCurIndex((prev) => prev + 1);
    };

    const handlePrevious = () => {
        if (edit) {
            toast.error("Please save changes before moving to the previous question.", {
                position: "top-center",
                autoClose: 1000,
            });
            return;
        }
        setCurIndex((prev) => prev - 1);
    };

    const saveChanges = () => {
        setEdit(false);

        toast.success("Saved successfully!", {
            position: "top-center",
            autoClose: 1000,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            toast.error("Please save changes before moving to the previous question.", {
                position: "top-center",
                autoClose: 1000,
            });
            return;
        } else {
            console.log(answer)

        }
    };

    return (
        <>
            <ToastContainer />
            {loading ? (
                <div className={styles.spinnerContainer}>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className={styles.flex}>
                    <h1>Exam</h1>
                    {getExam.length > 0 && (
                        <form className={styles.inner}>
                            <label>Question {curIndex + 1}</label>
                            <input
                                type="text"
                                name="question"
                                value={getExam[curIndex]?.question}
                                readOnly
                            />

                            <label>Options</label>
                            <div className={styles.optionContainer}>
                                {getExam[curIndex]?.options.map((optionValue, index) => (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name={`question-${curIndex}`}
                                            value={optionValue}
                                            checked={answer[curIndex]?.answer === optionValue}
                                            onChange={() =>
                                                handleRadio(getExam[curIndex]._id, optionValue)
                                            }
                                        />
                                        {optionValue}
                                    </label>
                                ))}
                            </div>

                            <div className={styles.btnContainer}>
                                <button
                                    type="button"
                                    className={styles.btn}
                                    onClick={handlePrevious}
                                    disabled={curIndex === 0}
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    className={styles.btn}
                                    onClick={saveChanges}
                                >
                                    Save
                                </button>
                                {curIndex < getExam.length - 1 && (
                                    <button
                                        type="button"
                                        className={styles.btn}
                                        onClick={handleNext}
                                    >
                                        Next
                                    </button>
                                )}

                                {curIndex === getExam.length - 1 && (
                                    <Link to="/submit-review">
                                        <button
                                            onClick={handleSubmit}
                                            type="submit"
                                            className={styles.btn}
                                        >
                                            Submit & Review
                                        </button>
                                    </Link>
                                )}


                            </div>
                        </form>
                    )}
                </div>
            )}
        </>
    );
}
