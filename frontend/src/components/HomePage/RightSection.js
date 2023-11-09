import { useState } from "react";
import { MDBCol } from "mdb-react-ui-kit";
import LoginForm from "../LoginForm";
import SignupForm from '../SignupForm';
import FeatureList from "../CommonComponents/FeatureList";

function RightSection() {
    const [showForm, setShowForm] = useState('signin');
    return (
        <MDBCol col='6' className="mb-5 d-flex justify-content-center right-section">
            <h1 className=" text-white text-center mt-5 mb-0 d-none">
                Welcome To My Notepad
            </h1>
            { showForm === 'signin' ?
             <LoginForm setShowForm={setShowForm}/> :
             <SignupForm setShowForm={setShowForm}/>
            }
            <div className="mb-0 d-none feature-list-div">
              <FeatureList />
            </div>

        </MDBCol>
    );
};

export default RightSection;
