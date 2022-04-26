import React from 'react';
import './NoteForm.css';

const NoteForm = (props) => {
    const { formTitle, title, content, titleChanged, contentChanged, submitClicked, submitText } = props;
    return (
        <div>
            <h2>{formTitle}</h2>
            <div>
                <input
                    type="text"
                    name="title"
                    className="notes__title"
                    placeholder="Enter a title..."
                    value={title}
                    onChange={titleChanged}
                />

                <textarea
                    rows="10"
                    name="content"
                    className="notes__body"
                    placeholder="type"
                    onChange={contentChanged}
                    value={content}
                />

                <a href="#" className="button green" onClick={submitClicked}>{submitText}</a>
            </div>

        </div>
    );
}

export default NoteForm;