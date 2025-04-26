import React, { useState } from "react"
export default function CreateExan() {
    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")
    const queArray = {
        question: "",
        option: ["", "", "", ""],
        ans: ""
    }
    const [que, setque] = useState(
        Array.from({ length: 15 }, () => ({ ...queArray }))
    )
    const handletitle = (e) => {
        setTitle(e.target.value)
    }
    const handleChange = (index, que, value) => {
        console.log(index, que, value)
    }
    return (
        <>
            <form style={{ width: "400px" }}>
                <input type="text" placeholder="subject name" value={title} onChange={(e) => { handletitle(e) }}></input>
                <h2>Question</h2>
                {que.map((que, index) => {
                    return (
                        <>
                            <h4>question{index + 1}</h4>
                            <input type="text" value={que.question} onChange={(e) => { handleChange(index, "question", e.target.value) }} />
                        </>
                    )
                })}
            </form>
        </>
    )
}