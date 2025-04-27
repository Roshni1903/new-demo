
import React, { useState } from "react"
import styles from "./createExam.module.css"
export default function CreateExam() {
    const [subject, setSubject] = useState("")
    const [notes, setNotes] = useState("")
    const handleTitle = (e) => {
        setSubject(e.target.value)
        console.log(subject)
    }
    const handleNotes = (e) => {
        const updateNotes = [...notes, e.target.value]
        setNotes(updateNotes)
    }
    return (
        <div className={styles.flex}>
            <h1>create exam</h1>
            <form className={styles.inner}>
                {false ?
                    <>
                        <label htmlFor="subject">Title</label>
                        <input type="text" placeholder="enter subject" value={subject} onChange={(e) =>
                            handleTitle(e)
                        } />
                    </>
                    : null}
                <label htmlFor="question">Question-1</label>
                <input type="text" />
                <label htmlFor="options">Options</label>
                <input type="text" placeholder="option1" />
                <input type="text" placeholder="option2" />
                <input type="text" placeholder="option3" />
                <input type="text" placeholder="option4" />
                <label htmlFor="answer">Answer</label>
                <input type="text" placeholder="enter correct answer" />
                <input type="text" value={notes} placeholder="enter notes" onChange={(e) => handleNotes(e)} />
            </form>
        </div>

    )
}