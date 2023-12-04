import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserInfo from './UserInfo';
import {
    MDBIcon,
    MDBBtn
} from 'mdb-react-ui-kit';

import Clock from './Clock';

import './index.css';

function Settings() {
    const sessionUser = useSelector(state => state.session.user);
    const [showUserInfo, setShowUserInfo] = useState(false);

    return (
        <div className='settings'>
            <MDBBtn className='fs-6 settings-btn'
              onClick={() => setShowUserInfo(!showUserInfo)}
            >
                <MDBIcon icon="cog" className="me-2" />
                {sessionUser.email}
            </MDBBtn>
            { showUserInfo ? <UserInfo user={sessionUser} /> : null }
            <Clock />
        </div>
    )
};

export default Settings;
