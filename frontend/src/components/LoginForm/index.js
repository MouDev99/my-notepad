import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/session';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput
} from 'mdb-react-ui-kit';

function LoginForm({ setShowForm }) {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrors, setLoginErrors] = useState({});
    const dispatch = useDispatch();

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

                    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                            <p className="text-white-50 mb-3">Please enter your login and password!</p>

                            <p className='mb-0 text-danger' style={{ minHeight: "24px" }}>
                                { loginErrors.loginFailedError ?
                                  '*' + loginErrors.loginFailedError : null
                                }
                            </p>

                            <p className='mb-0 text-danger' style={{ minHeight: "24px" }}>
                                { loginErrors.emptyCred ? '*Please provide a username or email' : null }
                            </p>
                            <MDBInput wrapperClass='mb-2 mx-5 w-100' labelClass='text-white' label='Username or Email'
                              type='text' size="lg"
                              value={credential}
                              onChange={(e) => setCredential(e.target.value)}
                            />

                            <p className='mb-0 text-danger' style={{ minHeight: "24px" }}>
                                {loginErrors.emptyPass ? '*Please provide a password' : null}
                            </p>
                            <MDBInput wrapperClass='mb-2 mx-5 w-100' labelClass='text-white' label='Password'
                                type='password' size="lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {/* <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}
                            <MDBBtn outline className='mt-3 mx-2 px-5' color='white' size='lg'
                              onClick={HandleLogin}
                            >
                                Login
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
                                <p className="mt-3 mb-0">Don't have an account?  <span> </span>
                                  <a href="#!" className="text-white-50 fw-bold"
                                    onClick={() => setShowForm('signup')}
                                  >
                                    Sign Up
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

export default LoginForm;
