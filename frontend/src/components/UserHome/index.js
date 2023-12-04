import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom';

import { fetchNotes } from "../../store/notes";

import ToolBar from "./ToolBar";
import NoteBrowser from "./NoteBrowser";
import NoteView from "./NoteView";
import Settings from "./Settings";

import './index.css';

function UserHome() {
    const dispatch = useDispatch();

    useEffect( () => {
        const fetchData = async () => {
            const delay = () => new Promise(resolve => setTimeout(resolve, 1000));
            await delay();
            await dispatch(fetchNotes());
        };
        fetchData();
    }, [dispatch]);

    return (
        <div className="user-home">
            <ToolBar />
            <div className="content">
                <NoteBrowser />
                <Routes>
                    <Route path="/" element={<h2 className="no-note">Select a note to view</h2>}/>
                    <Route path='/notes/:noteId' element={<NoteView />}/>
                </Routes>
                <Settings />
            </div>
        </div>
    );
};

export default UserHome;
