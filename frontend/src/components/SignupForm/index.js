import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../store/session';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
} from 'mdb-react-ui-kit';

function SignupForm({ setShowForm }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signupErrors, setSignupErrors] = useState({});
    const dispatch = useDispatch();

    const handleSignup = async () => {
        const errors = {};
        if (!username.trim().length) errors.emptyUsername = true;
        if (!email.trim().length) errors.emptyEmail = true;
        if (!password.trim().length) errors.emptyPass = true;

        if (!errors.emptyPass && password !== confirmPassword) {
            errors.passwordsDontMatch = true;
            setSignupErrors(errors);
            return;
        };

        if (errors.emptyUsername || errors.emptyEmail || errors.emptyPass) {
            setSignupErrors(errors);
            return;
        };

        try {
            const user = { username, email, password };
            await dispatch(signupUser(user));
            setSignupErrors({});
        } catch(err) {
            const resData = await err.json();
            setSignupErrors({signupFailedErrors: resData.errors});
        };

    };

    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                            <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                            <p className="text-white-50 mb-3">Signup for a new account</p>

                            <ul className='mb-0 text-danger' style={{ minHeight: "24px" }}>
                                { signupErrors.signupFailedErrors ?
                                  signupErrors.signupFailedErrors.map((err, i) => {
                                    return (<li key={i}>{err}</li>)
                                  })
                                  : null
                                }
                            </ul>

                            <p className='mb-0 text-danger' style={{ minHeight: "24px" }}>
                                { signupErrors.emptyUsername ? '*Username field is required' : null }
                            </p>
                            <MDBInput wrapperClass='mb-2 mx-5 w-100' labelClass='text-white' label='Username'
                                type='text' size="lg"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <p className='mb-0 text-danger' style={{ minHeight: "24px" }}>
                                {signupErrors.emptyEmail ? '*Email field is required' : null}
                            </p>
                            <MDBInput wrapperClass='mb-2 mx-5 w-100' labelClass='text-white' label='Email'
                                type='email' size="lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <p className='mb-0 text-danger' style={{ minHeight: "24px" }}>
                                {signupErrors.emptyPass ? '*Password field is required' : null}
                            </p>
                            <MDBInput wrapperClass='mb-2 mx-5 w-100' labelClass='text-white' label='Password'
                                type='password' size="lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <p className='mb-0 text-danger' style={{ minHeight: "24px" }}>
                                {signupErrors.passwordsDontMatch ? '*Passwords do not match' : null}
                            </p>
                            <MDBInput wrapperClass='mb-2 mx-5 w-100' labelClass='text-white' label='Confirm password'
                                type='password' size="lg"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <MDBBtn outline className='mt-3 mx-2 px-5' color='white' size='lg'
                              onClick={handleSignup}
                            >
                                Sign Up
                            </MDBBtn>

                            {/* <div className='d-flex flex-row mt-3 mb-5'>
                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                    <MDBIcon fab icon='facebook-f' size="lg" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                    <MDBIcon fab icon='twitter' size="lg" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                    <MDBIcon fab icon='google' size="lg" />
                                </MDBBtn>
                            </div> */}

                            <div>
                                <p className="mt-3 mb-0">Already have an account? <span> </span>
                                  <a href="#!" className="text-white-50 fw-bold"
                                    onClick={() => setShowForm('signin')}
                                  >
                                    Log In
                                  </a>
                                </p>

                            </div>
                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
};

export default SignupForm;
