import React from 'react';
import './Alert.css'


const Alert = (props) => {
    return (
        <ul className="alert-container">
            {props.validationMessages.map((message, index) => <li key={index}>{message}</li>)}
        </ul>
    )
};

export default Alert;