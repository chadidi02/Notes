import React from "react";

const NotesList = (props) => {
    return (
        <div className="notes-list">
            <ul className="notes-list-item">{props.children}</ul>
        </div>
    );
};

export default NotesList;
