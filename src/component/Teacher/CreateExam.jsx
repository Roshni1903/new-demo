import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import styles from "./createExam.module.css";


export default function CreateExam() {
    const createEmptyQuestion = () => ({
        question: "",
        answer: "",
        options: ["", "", "", ""],
    });

    const [subject, setSubject] = useState("");
    const [curIndex, setCurIndex] = useState(0);
    const [question, setQuestion] = useState([createEmptyQuestion()]);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState({
        quesError: "",
        optionError: "",
        answerError: "",
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
        setSubject(e.target.value);
    };

    const handleNotes = (e) => {
        setNotes([e.target.value]);
    };

    const handlePrevious = (e) => {
        e.preventDefault();
        setCurIndex(curIndex - 1);
    };

    const handleNext = (e) => {
        e.preventDefault();
        const validationErrors = validate("allfield");
        if (Object.values(validationErrors).some((err) => err !== "")) return;

        if (edit) {
            toast.error("Please save the changes before proceeding.");
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

    const saveChanges = () => {
        setEdit(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const examobj = {
            subjectName: subject,
            questions: question.map((q) => ({
                ...q,
                answer: q.options[q.answer],
            })),
            notes: notes,
        };
        console.log(examobj);
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
                            readOnly
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
                            <button className={styles.btn} onClick={saveChanges}>
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
                        <input
                            type="text"
                            placeholder="Enter notes"
                            onChange={handleNotes}
                        />
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