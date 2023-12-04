import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';

import { updateNote } from '../../../store/notes';

import NoteActionsBar from './NoteActionsBar';

import { MDBBtn } from 'mdb-react-ui-kit';

import './index.css';

function NoteView() {
  const { noteId } = useParams();
  const notes = useSelector(state => state.notes);
  const note = notes.find(note => note.id === parseInt(noteId));
  const contentDivRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fontSize, setFontSize] = useState(16);
  const [sharedHeight, setSharedHeight] = useState(30);
  const [loading, setLoading] = useState(true);
  const [updateErrors, setUpdateErrors] = useState([]);
  const [saveChangesClicked, setSaveChangesClicked] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  useEffect(() => {
    setUpdateErrors([]);
    if (!note) return;
    const contentDiv = document.querySelector("div.note-content");
    contentDiv.innerText = note.content;
  }, [note]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const errors = [];
    const title = document.querySelector("h2.note-title").innerText.trim();
    const content = document.querySelector("div.note-content").innerText.trim();
    const id = note.id;

    if (!title.length) errors.push("Title must be 1-100 characters.");
    if (!content.length) errors.push("Content can't be empty.");

    if (errors.length) {
      setUpdateErrors(errors);
      return
    };

    try {
      setSaveChangesClicked(true);
      await dispatch(updateNote({ title, content, id }));
      await delay();
      setSaveChangesClicked(false);
      navigate(`/notes/${id}`);
    } catch(err) {
      await delay();
      setSaveChangesClicked(false);
      const resData = await err.json();
      setUpdateErrors(resData.errors);
    }
  };

  const delay = () => {
    return new Promise(res => setTimeout(res, 500));
  };

  const LoadingUI = (
    <ReactLoading
      className="note-view-loading" height="40px" width="40px"
      color="#0056b3"
      type="spin"
    />
  );

  if (!notes.length && loading) {
    return (
      <div className="note-view">{LoadingUI}</div>
    )
  };

  if (!note) {
    return (
      <div className="note-view">
        <h2>No note found or deleted.</h2>
      </div>
    )
  };

  return (
    <div className="note-view">
        <NoteActionsBar
          props={{
            fontSize, setFontSize,
            sharedHeight, setSharedHeight,
            contentDivRef, targetNote: note
          }}
        />

        <h2
          className='note-title'
          contentEditable="true"
          suppressContentEditableWarning={true}
        >
          { note.title }
        </h2>

        <div
          className='note-content'
          contentEditable="true"
          suppressContentEditableWarning={true}
          ref={contentDivRef}
          style = {{
            fontSize: `${fontSize}px`,
            background: `repeating-linear-gradient(rgb(199, 199, 201) 0px, #fff 2px, #fff ${sharedHeight}px )`,
            lineHeight: `${sharedHeight}px`
          }}
        >
          { note.content }
        </div>

        <span className='vertical-bar'  contentEditable="false"></span>

        <div className='save-changes-btn-wrapper'>
          <MDBBtn color='primary'
            onClick={handleSaveChanges}
          >
            { saveChangesClicked ? (
                <div style={{ display: "flex", gap: "5px", alignItems: "flex-end"}}>
                  <ReactLoading type='spin' height="24px" width="24px"/>
                  <span style={{ fontSize: "15px"}}>
                    Saving...
                  </span>
                </div>
              ) : "Save changes"
            }
          </MDBBtn>
        </div>
        { updateErrors.length !== 0 &&
          <div className="update-errors">
            <ul>
              { updateErrors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <MDBBtn color='danger' onClick={() => setUpdateErrors([])}>
              OK
            </MDBBtn>
          </div>
        }
    </div>
  );
};

export default NoteView;
