import React, { useEffect, useState } from "react";
import instance from "../axiosInstance";
import { useParams } from "react-router-dom";
import styles from "./edit.module.css";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";
import { toast, ToastContainer } from "react-toastify";

export default function EditExam() {
    const [question, setQuestion] = useState([]);
    const [subjectName, setSubject] = useState()
    const [notes, setNotes] = useState([])
    const [curIndex, setCurIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [error, setError] = useState({
        quesError: "",
        optionError: "",
        answerError: "",
    });
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await instance.get(
                    `dashboard/Teachers/examDetail?id=${id}`,
                    {
                        headers: {
                            "access-token": token,
                        },
                    }
                );
                if (response.data.statusCode === 200) {
                    setQuestion(response.data.data.questions);
                }
                const examDetails = await instance.get(
                    `dashboard/Teachers/viewExam`,
                    {
                        headers: {
                            "access-token": token,
                        },
                    }
                );
                const examList = examDetails.data.data;
                if (examDetails.data.statusCode === 200) {
                    const matchid = examList.find(element => id === element._id)
                    if (matchid) {
                        const { subjectName, notes } = matchid;
                        setSubject(subjectName);
                        setNotes(notes);
                    }

                }

                setLoading(false)
            } catch (e) {
                console.log(e);
            }
        };

        if (token) {
            fetchData();
        }
    }, [id, token]);
    // console.log(subjectName)
    // console.log(notes)
    const validate = (name, value) => {
        const newErrors = {};
        if (name === "allfield") {
            const currentQuestion = question[curIndex];

            if (currentQuestion.question === "") {
                newErrors.quesError = "Question is required";
            }

            const emptyOption = currentQuestion.options.some((opt) => opt === "");
            if (emptyOption) {
                newErrors.optionError = "All options are required";
            }

            if (currentQuestion.answer === "") {
                newErrors.answerError = "Please select a correct answer";
            }
        } else {
            switch (name) {
                case "question":
                    newErrors.quesError = value === "" ? "Question is required" : "";
                    break;
                case "option-text":
                    newErrors.optionError = value === "" ? "All options are required" : "";
                    break;
                case "answer":
                    newErrors.answerError = value === "" ? "Select one correct answer!" : "";
                    break;
                default:
                    break;
            }
        }
        setError(newErrors);
        return newErrors;
    };

    const checkExisting = () => {
        let include;
        const quesValue = question[curIndex].question;
        const optionValue = question[curIndex].options;
        question.forEach((element, index) => {
            if (element.question.includes(quesValue) && curIndex !== index) {
                include = true;
            }
        });
        new Set(optionValue).size !== optionValue.length ? (include = true) : null;
        return include;
    };

    const handleQuesChange = (e) => {
        const { value } = e.target;
        const update = [...question];
        update[curIndex].question = value;
        setQuestion(update);
        validate("question", value);
        setEdit(true);
    };

    const handleOptionChange = (e, index) => {
        const { value } = e.target;
        const update = [...question];

        if (update[curIndex].answer === update[curIndex].options[index]) {
            update[curIndex].answer = value;
        }

        update[curIndex].options[index] = value;

        setQuestion(update);
        validate("option-text", value);
        setEdit(true);
    };


    const handleAnswerChange = (option) => {
        const update = [...question];
        update[curIndex].answer = option;
        setQuestion(update);
        validate("answer", option);
    };

    const handlePrevious = (e) => {
        if (edit) {
            toast.error("Please save  changes before moving to the previous question.", {
                position: "top-center",
                autoClose: 1000,
            });
            return;
        }
        if (curIndex > 0) {
            setCurIndex(curIndex - 1);
        }
    };

    const handleNext = (e) => {
        e.preventDefault();

        const validationErrors = validate("allfield");
        if (Object.values(validationErrors).some((err) => err !== "")) return;

        const include = checkExisting();
        if (include) {
            toast("Question already included or any of the options are the same", {
                autoClose: 1000,
                position: "top-center",
            });
            return;
        }

        if (edit) {
            toast.error("Please save the changes before proceeding.", {
                position: "top-center",
                autoClose: 1000,
            });
            return;
        }

        if (curIndex < question.length - 1) {
            setCurIndex(curIndex + 1);
        }
    };

    const saveChanges = (e) => {
        e.preventDefault();

        const validationErrors = validate("allfield");
        if (Object.values(validationErrors).some((err) => err !== "")) return;

        const include = checkExisting();
        if (include) {
            toast("Question already included or any of the options are the same", {
                autoClose: 1000,
                position: "top-center",
            });
            return;
        }

        setEdit(false);
        toast.success("Saved successfully!", {
            position: "top-center",
            autoClose: 1000,
        });
    };

    return (
        <>
            {loading ? (
                <div className={styles.spinnerContainer}>
                    <LoadingSpinner />
                </div>
            ) : (

                <div className={styles.flex}>
                    <ToastContainer />
                    <form className={styles.inner}>
                        {question.length > 0 && (
                            <>
                                <label htmlFor="question">Question {curIndex + 1}</label>
                                <input
                                    type="text"
                                    name="question"
                                    placeholder={`Enter question ${curIndex + 1}`}
                                    value={question[curIndex].question}
                                    onChange={handleQuesChange}
                                />
                                <ErrorContainer error={error.quesError} />

                                <label>Options</label>
                                {question[curIndex].options.map((opt, index) => (
                                    <div key={index} className={styles.optionContainer}>
                                        <input
                                            type="radio"
                                            name={`question-${curIndex}`}
                                            value={opt}
                                            checked={question[curIndex].answer === opt}
                                            onChange={() => handleAnswerChange(opt)}
                                        />
                                        <input
                                            type="text"
                                            name="option-text"
                                            value={opt}
                                            onChange={(e) => handleOptionChange(e, index)}
                                            placeholder={`Enter option ${index + 1}`}
                                        />
                                    </div>
                                ))}
                                <ErrorContainer error={error.optionError} />

                                <label>Answer</label>
                                <input
                                    name="answer"
                                    type="text"
                                    value={question[curIndex].answer}
                                    placeholder="Select correct answer from above"
                                />
                                <ErrorContainer error={error.answerError} />
                            </>
                        )}

                        <div className={styles.btnContainer}>
                            <button
                                type="button"
                                className={styles.btn}
                                disabled={curIndex === 0}
                                onClick={handlePrevious}
                            >
                                Previous
                            </button>

                            {curIndex < question.length - 1 ? (
                                <>
                                    <button
                                        type="button"
                                        className={styles.btn}
                                        onClick={(e) => saveChanges(e)}
                                    >
                                        Save
                                    </button>
                                    <button type="button" className={styles.btn} onClick={handleNext}>
                                        Next
                                    </button>
                                </>
                            ) : (
                                <button type="submit" className={styles.btn}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

const ErrorContainer = ({ error }) => {
    if (error) {
        return <span style={{ color: "red" }}>{error}</span>;
    } else {
        return null;
    }
};
