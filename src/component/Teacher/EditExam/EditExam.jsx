import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instance from "/src/component/axiosInstance.jsx";
import styles from "./editExam.module.css";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";
import { toast, ToastContainer } from "react-toastify";

export default function EditExam() {
    const role = localStorage.getItem("role");
    const navigate = useNavigate();
    const [question, setQuestion] = useState([]);
    const [subjectName, setSubject] = useState("");
    const [notes, setNotes] = useState([]);
    const [curIndex, setCurIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [error, setError] = useState({
        quesError: "",
        optionError: "",
        answerError: "",
        notesError: "",
    });
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await instance.get(
                    `dashboard/Teachers/examDetail?id=${id}`,
                    {
                        headers: { "access-token": token },
                    }
                );

                if (response.data.statusCode === 200) {
                    const updatedQuestions = response.data.data.questions.map((q) => {
                        const index = q.options.findIndex((opt) => opt === q.answer);
                        return { ...q, answer: index !== -1 ? index : null };
                    });
                    setQuestion(updatedQuestions);
                }

                const examDetails = await instance.get(
                    `dashboard/Teachers/viewExam`,
                    {
                        headers: { "access-token": token },
                    }
                );
                const examList = examDetails.data.data;
                const matchid = examList.find((element) => id === element._id);
                if (matchid) {
                    setSubject(matchid.subjectName);
                    setNotes(matchid.notes);
                }

                setLoading(false);
            } catch (e) {
                toast.error("Something went wrong!", {
                    position: "top-center",
                    autoClose: 1000,
                });
                setLoading(false);
            }
        };

        if (token) fetchData();
    }, [id, token]);

    const validate = (name, value) => {
        const newErrors = { ...error };
        const currentQuestion = question[curIndex];

        if (name === "allfield") {
            if (!currentQuestion.question) newErrors.quesError = "Question is required";
            else newErrors.quesError = "";

            if (currentQuestion.options.some((opt) => opt.trim() === ""))
                newErrors.optionError = "All options are required";
            else newErrors.optionError = "";

            if (currentQuestion.answer === null || currentQuestion.answer === undefined)
                newErrors.answerError = "Please select a correct answer";
            else newErrors.answerError = "";

            if (!subjectName) newErrors.subjectError = "Please select subject";
            else newErrors.subjectError = "";

            if (notes.some((note) => note.trim() === ""))
                newErrors.notesError = "Please add valid note.";
            else newErrors.notesError = "";
        } else {
            if (name === "question")
                newErrors.quesError = value === "" ? "Question is required" : "";
            if (name === "option-text")
                newErrors.optionError = value === "" ? "All options are required" : "";
            if (name === "subject")
                newErrors.subjectError = value === "" ? "Please select subject!" : "";
            if (name === "notes")
                newErrors.notesError = value === "" ? "Note cannot be empty" : "";
        }

        setError(newErrors);
        return newErrors;
    };

    const checkExisting = () => {
        let include = false;
        const quesValue = question[curIndex].question.toLowerCase();
        const optionValue = question[curIndex].options;

        const isDuplicateQuestion = question.some(
            (q, index) => index !== curIndex && q.question.toLowerCase() === quesValue
        );
        if (isDuplicateQuestion) include = true;

        if (new Set(optionValue).size !== optionValue.length) include = true;

        return include;
    };

    const handleQuesChange = (e) => {
        const { value } = e.target;
        const updated = [...question];
        updated[curIndex].question = value;
        setQuestion(updated);
        validate("question", value);
        setEdit(true);
    };

    const handleOptionChange = (e, index) => {
        const { value } = e.target;
        const updated = [...question];
        updated[curIndex].options[index] = value;
        setQuestion(updated);
        validate("option-text", value);
        setEdit(true);
    };

    const handleRadio = (index) => {
        const updated = [...question];
        updated[curIndex].answer = index;
        setQuestion(updated);
        setEdit(true);
    };

    const handleSubject = (e) => {
        const { value } = e.target;
        setSubject(value);
        validate("subject", value);
        setEdit(true);
    };

    const handleNotes = (e, index) => {
        const { value } = e.target;
        const updatedNotes = [...notes];
        updatedNotes[index] = value;
        setNotes(updatedNotes);
        validate("notes", value);
        setEdit(true);
    };

    const deleteNote = (index) => {
        const updated = notes.filter((_, i) => i !== index);
        setNotes(updated);
    };

    const addNotes = () => {
        setNotes([...notes, ""]);
    };

    const handlePrevious = () => {
        if (edit) {
            toast.error("Please save changes before moving to the previous question.", {
                position: "top-center",
                autoClose: 1000,
            });
            return;
        }
        if (curIndex > 0) setCurIndex(curIndex - 1);
    };

    const handleNext = (e) => {
        e.preventDefault();

        const validationErrors = validate("allfield");
        if (Object.values(validationErrors).some((err) => err !== "")) return;

        if (edit) {
            toast.error("Please save the changes before proceeding.", {
                position: "top-center",
                autoClose: 1000,
            });
            return;
        }

        setCurIndex(curIndex + 1);
    };

    const saveChanges = (e) => {
        e.preventDefault();

        const validationErrors = validate("allfield");
        if (Object.values(validationErrors).some((err) => err !== "")) return;

        if (checkExisting()) {
            toast("Question already included or any of the options are same", {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate("allfield");
        if (Object.values(validationErrors).some((err) => err !== "")) return;

        if (edit) {
            toast.error("Please save changes before submitting.", {
                position: "top-center",
                autoClose: 1000,
            });
            return;
        }

        const formattedQuestions = question.map((q) => ({
            ...q,
            answer: q.options[q.answer],
        }));

        const exam = {
            subjectName,
            questions: formattedQuestions,
            notes,
        };

        try {
            const response = await instance.put(
                `dashboard/Teachers/editExam?id=${id}`,
                exam,
                { headers: { "access-token": token } }
            );

            if (response.data.message) {
                toast(response.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                });
            }

            if (response.data.statusCode === 200) navigate("/dashboard");
        } catch (e) {
            toast.error("At least one note is required and cannot be empty!", {
                position: "top-center",
                autoClose: 1000,
            });
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
                    <form onSubmit={handleSubmit} className={styles.inner}>
                        {curIndex === 0 && (
                            <>
                                <h2>Edit Exam</h2>
                                <label>Subject</label>
                                <input
                                    type="text"
                                    value={subjectName}
                                    name="subject"
                                    placeholder="Enter subject"
                                    onChange={handleSubject}
                                />
                                <ErrorContainer error={error.subjectError} />
                            </>
                        )}

                        {question.length > 0 && (
                            <>
                                <label>Question {curIndex + 1}</label>
                                <input
                                    type="text"
                                    name="question"
                                    value={question[curIndex].question}
                                    placeholder={`Enter question ${curIndex + 1}`}
                                    onChange={handleQuesChange}
                                />
                                <ErrorContainer error={error.quesError} />

                                <label>Options</label>
                                {question[curIndex].options.map((opt, index) => (
                                    <div key={index} className={styles.optionContainer}>
                                        <input
                                            type="radio"
                                            name={`question-${curIndex}`}
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
                                    readOnly
                                    value={
                                        question[curIndex].answer !== null
                                            // question[curIndex].options[question[curIndex].answer]
                                            ? question[curIndex].options[question[curIndex].answer]
                                            : ""
                                    }
                                    placeholder="select correct answer from above"
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
                            <button type="button" className={styles.btn} onClick={saveChanges}>
                                Save
                            </button>
                            {curIndex < question.length - 1 ? (
                                <button type="button" className={styles.btn} onClick={handleNext}>
                                    Next
                                </button>
                            ) : (
                                <button type="submit" className={styles.btn}>
                                    Submit
                                </button>
                            )}
                        </div>

                        {curIndex === 14 && (
                            <>
                                <label>Add Notes</label>
                                {notes.map((note, index) => (
                                    <div key={index} className={styles.note}>
                                        <input
                                            type="text"
                                            name="notes"
                                            value={note}
                                            placeholder="Enter notes"
                                            onChange={(e) => handleNotes(e, index)}
                                        />
                                        <button type="button" onClick={() => deleteNote(index)}>
                                            X
                                        </button>
                                    </div>
                                ))}
                                <ErrorContainer error={error.notesError} />
                                <button type="button" onClick={addNotes}>
                                    Add Notes
                                </button>
                            </>
                        )}
                    </form>
                </div>
            )}
        </>
    );
}

const ErrorContainer = ({ error }) =>
    error ? <span style={{ color: "red" }}>{error}</span> : null;
