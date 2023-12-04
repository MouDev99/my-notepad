import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactLoading from 'react-loading';

import DeleteConfirmation from '../../CommonComponents/DeleteConfirmation';
import { Modal } from '../../../context/Modal';

import { MDBIcon } from 'mdb-react-ui-kit';

import './index.css';

function NoteBrowser() {
    const notes = useSelector(state => state.notes);

    const [showModal, setShowModal] = useState(false);
    const [targetNote, setTargetNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
    }, []);

    const handleDeleteIconClick = (e, note) => {
        e.preventDefault();
        e.stopPropagation();

        setTargetNote(note);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    return (
        <div className="note-browser">
            <div className='notes-header'>
               <h2>My Notes</h2>
            </div>
            <div className='notes-list'>
                {
                    notes.map( (note) => {
                        const { id, title } = note;
                        return (
                            <NavLink key={id} to={`/notes/${id}`}>
                                <MDBIcon fas icon="pencil-alt" />

                                { title.slice(0, 16) }

                                <MDBIcon fas icon="trash-alt" className='trash-icon' title="Delete note"
                                  onClick={(e) => handleDeleteIconClick(e, note)}
                                />
                            </NavLink>
                        )
                    })
                }
                {showModal &&
                    <Modal onClose={closeModal}>
                        <DeleteConfirmation onClose={closeModal} targetNote={targetNote}/>
                    </Modal>
                }
                { notes.length === 0 && loading &&
                    <ReactLoading
                      className="browser-notes-loading" height="30px" width="30px"
                      color="#0056b3"
                      type="spin"
                    />
                }
            </div>
        </div>
    );
};

export default NoteBrowser;
