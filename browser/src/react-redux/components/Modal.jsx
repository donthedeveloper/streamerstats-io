import React from 'react';

const Modal = (props) => {
    console.log('modal props:', props.isOpen);
    if (props.isOpen) {
        return (
            <div className='modal-overlay' onClick={props.closeModal}>
                <div className='modal-content'>
                    {props.children}
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default Modal;