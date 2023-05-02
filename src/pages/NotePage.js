import React, { useEffect, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
// import notes from '../assets/data'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
    let { noteId } = useParams()
    const [note, setNote] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getNote()
    }, [noteId])
    
    let getNote = async() => {
        if(noteId === 'new') return
        let response = await fetch(`http://localhost:5000/notes/${noteId}`)
        let data = await response.json()
        setNote(data)
    }

    let updateNote = async() => {
        await fetch(`http://localhost:5000/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        })
    }

    let createNote = async() => {
        await fetch(`http://localhost:5000/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        })
    }

    let handleSubmit = () => {
        if (noteId !== "new" && !note.body) {
            deleteNote()
        } else if (noteId !== "new") {
            updateNote()
        } else if (noteId === "new" && note.body) {
            createNote()
        }
        navigate('/')
    }

    let deleteNote = async() => {
        await fetch(`http://localhost:5000/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        navigate('/')
    }

    return (
        <>
            {console.log(note)}
            <div className='note'>
                <div className='note-header'>
                    <h3>
                        <Link to='/'>
                            <ArrowLeft onClick={handleSubmit} />
                        </Link>
                    </h3>
                    {
                        noteId !== 'new' ? (
                            <button onClick={deleteNote}>Delete</button>
                        ) : (
                            <button onClick={handleSubmit}>Done</button>
                        )
                    }
                </div>
                <textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value }) }} placeholder="Edit note" value={note.body}></textarea>
            </div>
        </>
    )
}

export default NotePage