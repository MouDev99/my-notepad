import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/session';
import { removeNotes } from '../../../store/notes';

import { MDBIcon, MDBBtn, } from 'mdb-react-ui-kit';

import './UserInfo.css';

function UserInfo({ user }) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(removeNotes());
    };

    return (
        <div className='user-info'>
            <h4 className="mb-3">{user.username}</h4>
            <p className="text-muted mb-4">{user.email}</p>
            <p className="text-muted mb-4">{user.createdAt}</p>
            <MDBBtn className='logout-btn' onClick={handleLogout}>
                <MDBIcon icon="sign-out-alt" className="me-2" />
                Logout
            </MDBBtn>
        </div>
    )
};

export default UserInfo;
