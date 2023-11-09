import React from 'react';
import { useSelector } from 'react-redux';
import UserHome from '../UserHome';
import LeftSection from './LeftSection';
import RightSection from './RightSection';

import {
  MDBContainer,
  MDBRow
} from 'mdb-react-ui-kit';

import './index.css';

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return (<UserHome />);

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <LeftSection />
        <RightSection />
      </MDBRow>
    </MDBContainer>
  );
};

export default HomePage;
