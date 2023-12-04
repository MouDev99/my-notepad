import React, {
    createContext,
    useContext,
    useEffect,
    useRef, useState,
} from 'react';

import ReactDOM from 'react-dom';

import './Modal.css';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const modalRef = useRef(null);
    const [value, setValue] = useState(null);

    useEffect( () => {
     setValue(modalRef.current);
    }, []);

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
};


export const Modal = ({ children, onClose, isSignupForm }) => {
    const modalNode = useContext(ModalContext);

    if(!modalNode) return null;

    const modalStyle = isSignupForm ? {
        marginTop: "1%",
        padding: "0%",
        alignItems: "flex-start"

    } : {};

    const modalContentStyle = isSignupForm ? {
        backgroundColor: "#332d2d",
        border: "none",
        padding: " 0rem 2rem 1rem",
        marginTop: "0px",

    } : {};

    const elements = (
        <div id="modal" style={modalStyle}>
            <div id="modal-background" onClick={onClose}> </div>
            <div id="modal-content" style={modalContentStyle}> { children } </div>
        </div>
    );

    return ReactDOM.createPortal(elements, modalNode);
};
