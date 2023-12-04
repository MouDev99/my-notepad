import React from "react";
import { useDispatch } from "react-redux";
import { deleteNote } from "../../../store/notes";

import { MDBBtn } from "mdb-react-ui-kit";

import './index.css'

function DeleteConfirmation({ onClose, targetNote }) {
    const dispatch = useDispatch();

    const handleNoteDeletion = async (e) => {
        e.preventDefault();

        try {
            await dispatch(deleteNote(targetNote.id));
            onClose();
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <div className="delete-confirmation">
            <h2>Delete Confirmation</h2>
            <div className="alert-msg">
                <p> Are you sure you want to delete this note?</p>
                <p>Title: { targetNote.title }</p>
            </div>
            <div className="delete-confir-btns-wrapper">
                <MDBBtn color="secondary" onClick={onClose}>Cancel</MDBBtn>
                <MDBBtn color="danger"
                  onClick={handleNoteDeletion}
                >
                    Delete
                </MDBBtn>
            </div>
        </div>
    )
};

export default DeleteConfirmation;
