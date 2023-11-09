
import { MDBCol } from "mdb-react-ui-kit"
import FeatureList from "../CommonComponents/FeatureList";

function LeftSection() {
    return (
        <MDBCol col='6' className="mb-5 left-section">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h1 className="mb-8">Welcome to My Notepad</h1>
                    <FeatureList />
                </div>
          </div>
        </MDBCol>
    );
};

export default LeftSection;
