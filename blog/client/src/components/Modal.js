import React, { useState } from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, handleSubmit, children }) => {
  return isOpen ? (
    <div className="modal-overlay" >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>      
        <div>
            {children}
           <div className='modal-buttons'>
               <button className="blog-btn" onClick={handleSubmit? handleSubmit: ""}>Yes</button>
               <button className="close-button blog-btn" onClick={onClose}>Cancel</button>
           </div>
        </div>     
      </div>
    </div>
  ) : null;
};

export default Modal;