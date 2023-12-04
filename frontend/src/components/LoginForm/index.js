import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/session';
import { Modal } from '../../context/Modal';
import SignupForm from '../SignupForm';

import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput
} from 'mdb-react-ui-kit';

import './index.css';

function LoginForm() {
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrors, setLoginErrors] = useState({});
    const dispatch = useDispatch();

    const closeSignupForm = () => setShowSignupForm(false);

    const HandleLogin = async () => {
        const errors = {};
        if (!credential.trim().length) errors.emptyCred = true;
        if (!password.trim().length) errors.emptyPass = true;

        if (errors.emptyCred || errors.emptyPass) {
            setLoginErrors(errors);
            return;
        };

        try {
            const user = { credential, password };
            await dispatch(loginUser(user));
            setLoginErrors({});
        } catch(err) {
            const resData = await err.json();
            setLoginErrors({ loginFailedError: resData.errors[0] })
        };

    };

    return (
        <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>
                    <MDBCard className='bg-dark text-white my-5 mx-auto login-form-card' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <MDBCardBody className='py-5 px-1 d-flex flex-column align-items-center mx-auto w-100'>

                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                            <p className="text-white-50 mb-3">Please enter your login and password!</p>

                            <p className='mb-0 text-danger' style={{ minHeight: "25px"}}>
                                {loginErrors.loginFailedError ?
                                    '*' + loginErrors.loginFailedError : null
                                }
                            </p>

                            <p className='mb-0 text-danger' style={{ minHeight: "25px" }}>
                                {loginErrors.emptyCred ? '*Please provide a username or email' : null}
                            </p>
                            <MDBInput wrapperClass='mb-2 mx-5 w-75 form-white' labelClass='text-white' label='Username or Email'
                                type='text' size="lg"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                            />

                            <p className='mb-0 text-danger' style={{ minHeight: "25px" }}>
                                {loginErrors.emptyPass ? '*Please provide a password' : null}
                            </p>
                            <MDBInput wrapperClass='mb-2 mx-5 w-75 form-white' labelClass='text-white' label='Password'
                                type='password' size="lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <MDBBtn outline className='mt-3 mx-2 px-5' color='white' size='lg'
                                onClick={HandleLogin}
                            >
                                Login
                            </MDBBtn>

                            <div>
                                <p className="mt-3 mb-0">Don't have an account?  <span> </span>
                                    <a href="#!" className="text-white-50 fw-bold"
                                        onClick={() => setShowSignupForm(true)}
                                    >
                                        Sign Up
                                    </a>
                                </p>

                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            { showSignupForm &&
              <Modal onClose={closeSignupForm} isSignupForm={true}>
                <SignupForm onClose={closeSignupForm} />
              </Modal>
            }
        </MDBContainer>
    );
};

export default LoginForm;
