import React from 'react';

const Modal = (props) => {
    console.log('modal props:', props.isOpen);
    if (props.isOpen) {
        return (
            <div className='modal-overlay' onClick={props.closeModal}>
                <div className='modal-content'>
                    {props.children}
                    <i className="fa fa-times modal-close" aria-hidden="true" onClick={ props.closeModal }></i>
                </div>
           </div>
        );
    } else {
        return null;
    }
};

export default Modal;