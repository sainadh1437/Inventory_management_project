import React, { useEffect } from 'react';
import '../css/CustomAlert.css';

const CustomAlert = ({ message, onClose, timer = 3000 }) => { // timer default is 3000ms
    useEffect(() => {
        const timeout = setTimeout(() => {
            onClose();
        }, timer);

        // Cleanup the timeout if the component unmounts before the timer ends
        return () => clearTimeout(timeout);
    }, [timer, onClose]);

    return (
        <div className="custom-alert">
            <div className="custom-alert-content">
                <p>{message}</p>
                <button className="close-button" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default CustomAlert;
