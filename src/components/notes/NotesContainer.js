import React from 'react'

const NotesContainer = (props) => {
    return (<div className="notes-section">
        {props.children}
    </div>)
}

export default NotesContainer