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
    const [subjectName, setSubject] = useState();
    const [notes, setNotes] = useState([]);
    const [curIndex, setCurIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [error, setError] = useState({
        quesError: "",
        optionError: "",
        answerError: "",
        notesError: ""
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
                const examDetails = await instance.get(`dashboard/Teachers/viewExam`, {
                    headers: {
                        "access-token": token,
                    },
                });
                const examList = examDetails.data.data;
                if (examDetails.data.statusCode === 200) {
                    const matchid = examList.find((element) => id === element._id);
                    if (matchid) {
                        const { subjectName, notes } = matchid;
                        setSubject(subjectName);
                        setNotes(notes);
                    }
                }
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };

        if (token) {
            fetchData();
        }
    }, [id, token]);
    const validate = (name, value) => {
        const newErrors = { ...error };

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
            } else {
                newErrors.answerError = "";
            }
            if (subjectName === "") {
                newErrors.subjectError = "Please select subject";
            }
            if (notes.length === 0 || notes.some(note => note === "")) {
                newErrors.notesError = "Please add at least one valid note.";
            } else {
                newErrors.notesError = "";
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
                // case "answer":
                //     newErrors.answerError = value === "" ? "Select one correct answer!" : "";
                //     break;
                case "subject":
                    newErrors.subjectError = value === "" ? "Please select subject!" : "";
                    break;
                case "notes":
                    newErrors.notesError =
                        value === "" ? "Please enter notes NA if not applicable" : "";

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
        setEdit(true);

    };
    const handlePrevious = () => {
        if (edit) {
            toast.error("Please save changes before moving to the previous question.", {
                position: "top-center",
                autoClose: 1000,
            });
            return;
        }
        if (curIndex > 0) {
            setCurIndex(curIndex - 1);
        }
    };


    const handleSubject = (e) => {
        const { name, value } = e.target;
        setSubject(e.target.value);
        validate(name, value);
        setEdit(true);
    };

    //NOTES

    const addNotes = () => {
        setNotes([...notes, ""]);
    };
    const handleNotes = (e, index) => {
        const { name, value } = e.target
        const updateNotes = [...notes];
        updateNotes[index] = e.target.value;
        setNotes(updateNotes);
        validate(name, value);

        setEdit(true);
    };
    const deleteNote = (rindex) => {
        const updateNotes = notes.filter((_, index) => index !== rindex);
        setNotes(updateNotes);
    };

    const handleNext = (e) => {
        e.preventDefault();

        const validationErrors = validate("allfield");
        if (Object.values(validationErrors).some((err) => err !== "")) return;
        checkExisting()

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

        // const include = checkExisting();
        // if (include) {
        //     toast("Question already included or any of the options are the same", {
        //         autoClose: 1000,
        //         position: "top-center",
        //     });
        //     return;
        // }

        setEdit(false);
        toast.success("Saved successfully!", {
            position: "top-center",
            autoClose: 1000,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const validationErrors = validate("allfield");
        if (Object.values(validationErrors).some((err) => err !== "")) return;
        if (edit) {
            toast.error(
                "Please save  changes before moving to the previous question.",
                {
                    position: "top-center",
                    autoClose: 1000,
                }
            );
            return;
        }
        const exam = {
            subjectName: subjectName,
            questions: question,
            notes: notes,
        };
        try {
            const response = await instance({
                url: `dashboard/Teachers/editExam?id=${id}`,
                method: "PUT",
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
            toast.error("something went wrong!", {
                position: "top-center",
                autoClose: 1000,
            });
        }
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
                    <form onSubmit={handleSubmit} className={styles.inner}>
                        {curIndex === 0 && (
                            <>
                                <h2>Edit Exam</h2>
                                <label htmlFor="subject">Subject</label>
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
                                    readOnly
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
                            <button
                                type="button"
                                className={styles.btn}
                                onClick={(e) => saveChanges(e)}
                            >
                                Save
                            </button>

                            {curIndex < question.length - 1 ? (
                                <>
                                    <button
                                        type="button"
                                        className={styles.btn}
                                        onClick={handleNext}
                                    >
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
                                                name="notes"
                                                value={element}
                                                placeholder="Enter notes"
                                                onChange={(e) => handleNotes(e, index)}
                                            />
                                            <button type="button" onClick={() => deleteNote(index)}>
                                                X
                                            </button>
                                        </div>
                                    );
                                })}
                                <ErrorContainer error={error.notesError} />

                                <button type="button" onClick={addNotes}>Add Notes</button>
                            </>
                        )}
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