import { csrfFetch } from "./csrf";

const ADD_NOTES = "notes/addNotes";
const REMOVE_NOTES = "notes/removeNotes"
const ADD_NEW_NOTE = "notes/addNewNote";
const EDIT_NOTE = "notes/editNote";
const REMOVE_NOTE = "notes/removeNote";

const addNotes = (notes) => {
    return {
        type: ADD_NOTES,
        notes
    }
};

export const removeNotes = () => {
    return {
        type: REMOVE_NOTES
    }
};

const addNewNote = (newNote) => {
    return {
        type: ADD_NEW_NOTE,
        newNote
    }
};

const editNote = (editedNote) => {
    return {
        type: EDIT_NOTE,
        editedNote
    }
};

const removeNote = (noteId) => {
    return {
        type: REMOVE_NOTE,
        noteId
    }
};

export const fetchNotes = () => async (dispatch) => {
    const response = await csrfFetch('/api/notes');

    if (!response.ok) throw response;

    const notes = await response.json();
    dispatch(addNotes(notes));
    return notes;
};

export const createNote = (note) => async (dispatch) => {
    const options = {
        method: "POST",
        body: JSON.stringify(note)
    };
    const response = await csrfFetch('/api/notes', options);

    if (!response.ok) throw response;

    const newNote = await response.json();
    dispatch(addNewNote(newNote));
    return newNote;
};

export const updateNote = (note) => async (dispatch) => {
    const url = `/api/notes/${note.id}`;
    const options = {
        method: "PUT",
        body: JSON.stringify(note)
    };
    const response = await csrfFetch(url, options);

    if(!response.ok) throw response;

    const editedNote = await response.json();
    dispatch(editNote(editedNote));
    return editedNote;
};

export const deleteNote = (noteId) => async (dispatch) => {
    const url = `/api/notes/${noteId}`;
    const options = { method: "DELETE"};
    const response = await csrfFetch(url, options);

    if (!response.ok) throw response;

    const resData = await response.json();
    dispatch(removeNote(resData.noteId));
    return resData.noteId;
};

const initialState = [];

const notesReducer = (state = initialState, action) => {
    switch (action.type ) {
        case ADD_NOTES:
            return [...action.notes];
        case ADD_NEW_NOTE:
            return [action.newNote, ...state];
        case EDIT_NOTE:
            const editedNoteId = action.editedNote.id;
            return state.map(note => note.id === editedNoteId ? action.editedNote : note );
        case REMOVE_NOTE:
            return state.filter(note => note.id !== action.noteId);
        case REMOVE_NOTES:
            return [];
        default:
            return state;
    };
};

export default notesReducer;
