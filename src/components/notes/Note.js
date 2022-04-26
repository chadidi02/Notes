import React from 'react';

const Note = (props) => {
    const { title, noteClicked, active } = props;
    let classes = ['note-item', 'notes-list-item--selected'];
    if (active) {
        classes.push('active')
    }
    return (
        <li className={classes.join(' ')} onClick={noteClicked}>{title}</li>
    );
};

export default Note;