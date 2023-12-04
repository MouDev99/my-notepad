import React from 'react';
import { useSelector } from 'react-redux';

import UserHome from '../UserHome';
import LoginForm from '../LoginForm';

import './index.css';

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);

  if(sessionUser) return (<UserHome />)

  return (
      <div className='home-page'>
        <div className='wlcm-section'>
          <i className="fas fa-feather-pointed"></i>
          <h1>Welcome To My-Notepad</h1>
        </div>

        < div className="feature-list">
          <h2>Take notes easily and benefit from using our app. Here's what you can do:</h2>
          <ul>
            <li>Organize your thoughts</li>
            <li>Stay productive</li>
            <li>Access your notes from anywhere</li>
            <li>Securely store and protect your notes</li>
            <li>Quickly search through your notes</li>
            <li>And much more!</li>
          </ul>
          <i className="fas fa-feather-pointed"></i>
        </div>

        <div className='login-wrapper'>
          <LoginForm />
        </div>
        <div className='footer'>
          <p> Copyright © 2023. All rights reserved.</p>
          <p>This note has been crafted to facilitate effortless note-taking and extended retention at your convenience.
             It has been meticulously designed for seamless usage and swift accessibility. Our commitment extends beyond this,
             as we are dedicated to continuously incorporating valuable features based on your feedback.
             Your satisfaction drives our ongoing enhancements and commitment to excellence
          </p>
        </div>
      </div>
  )
};

export default HomePage;
