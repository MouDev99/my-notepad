import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { createNote } from '../../../store/notes';

import { MDBBtn } from 'mdb-react-ui-kit';
import './index.css';

function CreateNoteForm({ onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [noteErrors, setNoteErrors] = useState({});
    const [backendErrors, setBackendErrors] = useState([]);

    const handleNoteCreation = async (e) => {
        e.preventDefault();
        const errors = {};

        if (title.length < 1 || title.length > 100) {
            errors.title = "Title must be 1-100 characters.";
        };
        if (!content.length) errors.content = "Content can't be empty.";

        if (Object.keys(errors).length) {
            setNoteErrors(errors);
            return;
        };

        try {
            const newNote = await dispatch(createNote({ title, content }));
            resetState();
            onClose();
            navigate(`/notes/${newNote.id}`);
        } catch(err) {
            const resData = await err.json();
            resetState();
            setBackendErrors(resData.errors);
        };
    };

    function resetState() {
        setNoteErrors({});
        setTitle('');
        setContent('');
        setBackendErrors([]);
    };

    return (
        <div className='create-note-form'>
            <h2>Create New Note</h2>
            { backendErrors.length > 0 && (
                <ul className='backend-errors'>
                    { backendErrors.map((err, i) => <li key={i}>{err}</li> ) }
                </ul>
            )}
            <div>
                <label htmlFor="title">Title</label>
                <input id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                >
                </input>
                <p style={{ color: '#DC143C', fontSize: "15px"}}>
                    { noteErrors.title }
                </p>
            </div>
            <div>
                <p>Content</p>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                >
                </textarea>
                <p style={{ color: '#DC143C', fontSize: "15px", marginTop: "-10px"}}>
                    { noteErrors.content }
                </p>
            </div>
            <div>
                <MDBBtn color="secondary" className="btn"
                  onClick={onClose}
                >
                   Cancel
                </MDBBtn>
                <MDBBtn color="primary" className="btn"
                  onClick={handleNoteCreation}
                >
                   Create Note
                </MDBBtn>
            </div>
        </div>
    )
};

export default CreateNoteForm;
