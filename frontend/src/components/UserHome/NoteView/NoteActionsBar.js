import React, { useEffect, useState } from 'react';
import * as DOMPurify from 'dompurify';
import { Modal } from '../../../context/Modal';
import DeleteConfirmation from '../../CommonComponents/DeleteConfirmation';

import { MDBIcon } from 'mdb-react-ui-kit';

import './NoteActionsBar.css';

function SearchInput() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const contentContainer = document.querySelector("div.note-content");
    const content = contentContainer.innerText;

    if (!query.trim().length) {
      contentContainer.innerText = content;
      return;
    };

    const cleanQuery = DOMPurify.sanitize(query);
    const regex = new RegExp(cleanQuery, 'gi');

    const updatedContent = content.replace(
      regex,
      match => `<span contentEditable="false" class="highlight">${match}</span>`
    );

    contentContainer.innerHTML = updatedContent;
  }, [query]);

  return (
    <div className='search-input'>
      <input className='form-control' placeholder="Search note..." aria-label="Search" type='Search'
        value={query}
        onChange={ (e) => setQuery(e.target.value)}
      />
      <MDBIcon fas icon="search" title="Search"/>
    </div>
  )
};

const NoteActionsBar = ({ props }) => {
  const {
    fontSize, setFontSize,
    sharedHeight, setSharedHeight,
    contentDivRef, targetNote
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied]  = useState(false);

  const handleEdit = () => {
    contentDivRef.current.focus();

    // Set cursor at the end of the text content
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(contentDivRef.current);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleDelete = () => setShowModal(true);

  const handleCopy = async () => {
    const contentContainer = document.querySelector('div.note-content');
    const content = contentContainer.innerText;
    await navigator.clipboard.writeText(content);

    setCopied(true);
    const delay = () => new Promise( resolve => setTimeout(resolve, 1500));
    await delay();
    setCopied(false);
  };

  const handleZoomIn = () => {
    if (fontSize === 26) return;
    setFontSize(fontSize + 2);
    setSharedHeight(sharedHeight +2);
  };

  const handleZoomOut = () => {
    if (fontSize === 14) return;
    setFontSize(fontSize - 2);
    setSharedHeight(sharedHeight -2);
  };

  const onClose = () => setShowModal(false);

  return (
    <div className="note-actions-bar">
        <SearchInput />
        <div className="action-icons-container">
          <MDBIcon far icon="edit" title="Edit note" onClick={handleEdit}/>
          <MDBIcon fas icon="trash-alt" title="Delete note" onClick={handleDelete}/>
          { copied ?
            <MDBIcon fas icon="check" title="Copied"/> :
            <MDBIcon far icon="copy" title="Copy note" onClick={handleCopy}/>
          }
          <MDBIcon fas icon="plus" title="Zoom in" onClick={handleZoomIn}/>
          <MDBIcon fas icon="minus" title="Zoom out" onClick={handleZoomOut}/>
        </div>
        { showModal &&
          <Modal onClose={onClose}>
            <DeleteConfirmation onClose={onClose} targetNote={targetNote}/>
          </Modal>
        }
    </div>
  );
};

export default NoteActionsBar;
