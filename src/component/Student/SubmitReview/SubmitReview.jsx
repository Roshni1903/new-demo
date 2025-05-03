import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styles from "./submitReview.module.css";
import { toast, ToastContainer } from "react-toastify";
import instance from "/src/component/axiosInstance.jsx";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx"
export default function SubmitReview() {
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { answers, getExam } = location.state;
    const { id } = useParams();
    const token = localStorage.getItem("token");
    useEffect(() => {
        const reviewData = getExam.map((q) => ({
            ...q,
            selectedAns: answers?.find((a) => a.question === q._id).answer,
        }));
        setReview(reviewData);
    }, [answers, getExam]);

    const handleRadio = (questionId, newAnswer) => {
        setReview((prev) =>
            prev.map((item) =>
                item._id === questionId ? { ...item, selectedAns: newAnswer } : item
            )
        );
    };
    // console.log("review", review);

    const handleSave = (e) => {
        e.preventDefault();
        toast.success("Saved successfully!", {
            position: "top-center",
            autoClose: 1000,
        });
        setEditable(null);
    };
    const handleEdit = (e, questionId) => {
        e.preventDefault();
        if (editable !== null) {
            toast.error("Save the changes first!", {
                position: "top-center",
                autoClose: 1000,
            });
            return;
        }
        setEditable(questionId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = review.map((element) => ({
            question: element._id,
            answer: element.selectedAns,
        }));

        try {
            setLoading(true);

            const response = await instance({
                url: `student/giveExam?id=${id}`,
                method: "POST",
                headers: {
                    "access-token": token,
                },
                data,
            });

            if (response.data.statusCode === 200) {
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                });

                setTimeout(() => {
                    navigate("/student/dashboard", { state: { refresh: Date.now() } });

                }, 1200);
            } else {
                toast.error(response.data.message || "Submission failed", {
                    position: "top-center",
                    autoClose: 1000,
                });
                setLoading(false);
            }
        } catch (e) {
            console.error(e);
            toast.error("Something went wrong!", {
                position: "top-center",
                autoClose: 1000,
            });
            setLoading(false);
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
                    <h1>Submit & Review</h1>

                    <form className={styles.inner}>
                        {review?.map((item, rindex) => {
                            return (
                                <>
                                    <label>Question {rindex + 1}</label>
                                    <input
                                        type="text"
                                        name="question"
                                        value={getExam[rindex]?.question}
                                        readOnly
                                    />
                                    <label>Options</label>
                                    <div className={styles.optionContainer}>
                                        {item.options.map((opt, index) => (
                                            <label key={index}>
                                                <input
                                                    type="radio"
                                                    name={`question-${rindex}`}
                                                    value={opt}
                                                    checked={item.selectedAns === opt}
                                                    disabled={editable !== item._id}
                                                    onChange={(e) => handleRadio(item._id, opt)}
                                                />
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                    <div className={styles.btnContainer}>
                                        <button
                                            onClick={(e) => handleSave(e)}
                                            className={styles.btn}
                                            disabled={editable !== item._id}
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={(e) => handleEdit(e, item?._id)}
                                            className={styles.btn}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </>
                            );
                        })}
                        <button onClick={(e) => handleSubmit(e)} className={styles.btn}>
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}