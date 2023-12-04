import React, { useState } from "react";
import { Modal } from '../../../context/Modal';
import CreateNoteForm from '../CreateNoteForm';

import './index.css';
import { MDBBtn } from 'mdb-react-ui-kit';

function CreateNewNoteButton() {
    const [showModal, setShowModal] = useState(false);

    const onClose = () => setShowModal(false);

    return (
        <div className="create-new-note-btn-wrapper">
            <MDBBtn className='create-new-note-btn' onClick={() => setShowModal(true)}>
                Create New Note
            </MDBBtn>
            { showModal && (
                <Modal onClose={onClose}>
                    <CreateNoteForm onClose={onClose} />
                </Modal>
            )}
        </div>
    )
};

export default CreateNewNoteButton;
