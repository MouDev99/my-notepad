import React from 'react';
import CreateNewNoteButton from '../../CommonComponents/CreateNewNoteButton';

import './index.css';

function ToolBar() {

    return (
        <div className="tool-bar">
            <CreateNewNoteButton />
        </div>
    )
};

export default ToolBar;
