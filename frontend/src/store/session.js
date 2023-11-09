import { csrfFetch } from "./csrf";

const ADD_USER = 'session/addUser';
const REMOVE_USER = 'session/removeUser';
const RESET_USER = 'session/resetUser';

const addUser = (user) => {
    return {
        type: ADD_USER,
        user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};

const resetUser = () => {
    return {
        type: RESET_USER
    };
};

export const loginUser = (user) => async (dispatch) => {
    const options = {
        method: "POST",
        body: JSON.stringify(user)
    }
    const response = await csrfFetch('/api/session', options);

    if (!response.ok) throw response;

    const data = await response.json();
    dispatch(addUser(data.user));
    return data;
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();

    if (data.user) dispatch(addUser(data.user));
    else dispatch(resetUser());
};

export const signupUser = (user) => async (dispatch) => {
    const options = {
        method: "POST",
        body: JSON.stringify(user)
    };
    const response = await csrfFetch('/api/users', options);

    if (!response.ok) throw response;

    const data = await response.json();
    dispatch(addUser(data.user));
    return data;
};

export const logoutUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', { method: "DELETE" });
    dispatch(removeUser());
    return response;
};

const initialState = { user: null };

const sessionReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_USER:
            return { user: {...action.user} };
        case REMOVE_USER || RESET_USER:
            return { user: null };
        default:
            return state;
    };
};

export default sessionReducer;
