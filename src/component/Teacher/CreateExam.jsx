import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import styles from "./createExam.module.css";
import instance from "../axiosInstance";
import { emailRegex } from "../regex";
export default function CreateExam() {
    const createEmptyQuestion = () => ({
        question: "",
        answer: "",
        options: ["", "", "", ""],
    });

    const [subject, setSubject] = useState("");
    const [curIndex, setCurIndex] = useState(0);
    const [question, setQuestion] = useState([createEmptyQuestion()]);
    const [notes, setNotes] = useState([""]);
    const [error, setError] = useState({
        quesError: "",
        optionError: "",
        answerError: "",
        subjectError: "",
    });
    const [edit, setEdit] = useState(false);
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
            if (subject === "") {
                newErrors.subjectError = "Please select subject";
            }
        } else {
            switch (name) {
                case "question":
                    newErrors.quesError = value === "" ? "Question is required" : "";
                    break;
                case "option-text":
                    newErrors.optionError =
                        value === "" ? "All options are required" : "";
                    break;
                case "answer":
                    newErrors.answerError =
                        value === "" ? "Select one correct answer!" : "";
                    break;
                case "subject":
                    newErrors.subjectError = value === "" ? "Please select subject!" : "";
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
        update[curIndex].options[index] = value;

        if (update[curIndex].answer === index && value === "") {
            update[curIndex].answer = null;
        }

        setQuestion(update);
        validate("option-text", value);
        setEdit(true);
    };

    const handleRadio = (index) => {
        const update = [...question];
        update[curIndex].answer = index;
        setQuestion(update);
        validate("answer", update[curIndex].options[index]);
    };

    const handleSubject = (e) => {
        const { name, value } = e.target;
        setSubject(e.target.value);
        validate(name, value);
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
    console.log("ques", question);
    const handleNext = (e) => {
        e.preventDefault();
        const validationErrors = validate("allfield");
        if (Object.values(validationErrors).some((err) => err !== "")) return;
        const include = checkExisting();

        if (include) {
            toast("Question already included or any of the options are same", {
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
        } else {
            const updatedQuestions = [...question, createEmptyQuestion()];
            setQuestion(updatedQuestions);
            setCurIndex(curIndex + 1);
        }
    };

    const addNotes = () => {
        setNotes([...notes, ""])
    }
    const handleNotes = (e, index) => {
        const updateNotes = [...notes]
        updateNotes[index] = e.target.value
        setNotes(updateNotes)
    }
    const deleteNote = (rindex) => {
        const updateNotes = notes.filter((_, index) => index !== rindex);
        setNotes(updateNotes)
    }
    const saveChanges = (e) => {
        e.preventDefault();
        const validationErrors = validate("allfield");
        if (Object.values(validationErrors).some((err) => err !== "")) return;
        const include = checkExisting();
        if (include) {
            toast("Question already included or any of the options are same", {
                autoClose: 1000,
                position: "top-center",
            });
            return;
        } else {
            setEdit(false);
            toast.success("saved successfully!", {
                position: "top-center",
                autoClose: 1000,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const validationErrors = validate("allfield");
        if (Object.values(validationErrors).some((err) => err !== "")) return;
        const exam = {
            subjectName: subject,
            questions: question.map((q) => ({
                ...q,
                answer: q.options[q.answer],
            })),
            notes: notes,
        };

        try {
            const response = await instance({
                url: "dashboard/Teachers/Exam",
                method: "POST",
                data: exam,
                headers: {
                    "access-token": token,
                },
            });
            console.log(response);
            if (response.data.message) {
                toast(response.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                });
            }
            if (response.data.statusCode === 200) {
                navigate("/dashboard");
            }
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className={styles.flex}>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.inner}>
                {curIndex === 0 && (
                    <>
                        <h2>Create Exam</h2>
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            name="subject"
                            placeholder="Enter subject"
                            onChange={handleSubject}
                        />
                        <ErrorContainer error={error.subjectError} />
                    </>
                )}

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
                                    value={index}
                                    checked={question[curIndex].answer === index}
                                    onChange={() => handleRadio(index)}
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
                            value={
                                question[curIndex].answer !== ""
                                    ? question[curIndex].options[question[curIndex].answer]
                                    : ""
                            }
                            placeholder="select Correct answer from above"
                        />
                        <ErrorContainer error={error.answerError} />
                    </>
                )}

                <div className={styles.btnContainer}>
                    <button
                        className={styles.btn}
                        onClick={handlePrevious}
                        disabled={curIndex === 0}
                    >
                        Previous
                    </button>
                    {curIndex < 14 ? (
                        <>
                            <button className={styles.btn} onClick={(e) => saveChanges(e)}>
                                Save
                            </button>
                            <button className={styles.btn} onClick={handleNext}>
                                Next
                            </button>
                        </>
                    ) : (
                        <button type="submit" className={styles.btn}>
                            Submit
                        </button>
                    )}
                </div>

                {curIndex === 14 && (
                    <>
                        <label htmlFor="notes">Add notes</label>
                        {notes.map((element, index) => {
                            return (
                                <div key={index} className={styles.note}>

                                    <input
                                        type="text"
                                        value={element}
                                        placeholder="Enter notes"
                                        onChange={(e) => handleNotes(e, index)}
                                    />
                                    <button type="button" onClick={() => deleteNote(index)}>X</button>
                                </div>
                            );
                        })}
                        <button onClick={(e, index) => addNotes(e, index)}>
                            Add Notes
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}

const ErrorContainer = ({ error }) => {
    if (error) {
        return <span style={{ color: "red" }}>{error}</span>;
    } else {
        return null;
    }
};