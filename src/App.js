import React, { useState } from "react";
import "./App.css";

import Preview from "./components/preview";
import Message from "./components/message";
import NotesContainer from "./components/notes/NotesContainer";
import NotesList from "./components/notes/NotesList";
import Note from "./components/notes/Note";

function App() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedNote, setSelectedNote] = useState(null);
    const [creating, setCreating] = useState(false);
    const [editing, setEditing] = useState(false);

    // Change note title
    const changeTitleHandler = (event) => {
        setTitle(event.target.value);
    };
    // Change note text
    const changeContentHandler = (event) => {
        setContent(event.target.value);
    };

    // Save note to local storage
    const saveNoteHandler = () => {
        const note = {
            id: new Date(),
            title: title,
            content: content,
        }

        const updatedNotes = [...notes, note];

        setNotes(updatedNotes);
        setCreating(false);
        setSelectedNote(note.id);
        setTitle("");
        setContent("");
    }


    const getAddNote = () => {
        return (
            <div>
                <h2>Add a new note</h2>
                <div>
                    <input
                        type="text"
                        name="title"
                        className="form-input mb-30"
                        placeholder="Title"
                        value={title}
                        onChange={changeTitleHandler}
                    />

                    <textarea
                        rows="10"
                        name="content"
                        className="form-input"
                        placeholder="Type your note here..."
                        value={content}
                        onChange={changeContentHandler}
                    />

                    <a href="#" className="button green" onClick={saveNoteHandler}>
                        Add
                    </a>
                </div>
            </div>
        );
    };

    const getPreview = () => {
        if (notes.length === 0) {
            return <Message title="no notes" />;

        }

        if (!selectedNote) {
            return <Message title="select a note" />
        }

        const note = notes.find((note) => {
            return note.id === selectedNote;
        })
        return (
            <div>
                <div className="note-operations">
                    <a href="#">
                        <i className="fa fa-pencil-alt" />
                    </a>
                    <a href="#">
                        <i className="fa fa-trash" />
                    </a>
                </div>
                <div>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                </div>
            </div>
        );
    };

    const addNoteHandler = () => {
        setCreating(true);
    };

    return (
        <div className="App">
            <NotesContainer className="notes-section">
                <NotesList>
                    {notes.map((note) => (
                        <Note
                            key={note.id}
                            title={note.title}
                            active={selectedNote === note.id}
                            noteClicked={() => selectNoteHandler(note.id)}
                        />
                    ))}
                </NotesList>
                <button className="add-btn" onClick={addNoteHandler}>
                    +
                </button>
            </NotesContainer>
            <Preview>{creating ? getAddNote() : getPreview()}</Preview>
        </div>
    );
}

export default App;
