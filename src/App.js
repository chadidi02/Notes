import React, { useState } from "react";
import "./App.css";

import Preview from "./components/preview";
import Message from "./components/message";
import NotesContainer from "./components/notes/NotesContainer";
import NotesList from "./components/notes/NotesList";
import Note from "./components/notes/Note";
import NoteForm from "./components/notes/NoteForm";

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

    //select note 
    const selectedNoteHandler = (noteId) => {
        setSelectedNote(noteId);
        setCreating(false);
        setEditing(false);
    }

    // Edit note
    const editNoteHandler = (noteId) => {
        const note = notes.find((note) => note.id === noteId);

        setEditing(true);
        setTitle(note.title);
        setContent(note.content);
    };

    // update note
    const updatedNote = () => {
        const updatedNotes = [...notes];
        const noteIndex = notes.findIndex(note => note.id === selectedNote);
        updatedNotes[noteIndex] = {
            id: selectedNote,
            title: title,
            content: content,
        }
        setNotes(updatedNotes);
        setEditing(false);
        setTitle("");
        setContent("");
    }

    // add note
    const addNoteHandler = () => {
        setCreating(true);
        setEditing(false);
        setTitle("");
        setContent("");

    };

    const getAddNote = () => {
        return (
            <NoteForm
                fromTitle="Add Note"
                title={title}
                content={content}
                titleChanged={changeTitleHandler}
                contentChanged={changeContentHandler}
                submitText="Add Note"
                submitClicked={saveNoteHandler}
            />
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

        let noteDisplay = (
            <div>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
            </div>
        )

        if (editing) {
            noteDisplay = (
                <NoteForm
                    fromTitle="edit Note"
                    title={title}
                    content={content}
                    titleChanged={changeTitleHandler}
                    contentChanged={changeContentHandler}
                    submitText="edit"
                    submitClicked={saveNoteHandler}
                />
            )
        }
        return (
            <div>
                {!editing &&
                    <div className="note-operations">
                        <a href="#" onClick={() => editNoteHandler(note.id)}>
                            <i className="fa fa-pencil-alt" />
                        </a>
                        <a href="#">
                            <i className="fa fa-trash" />
                        </a>
                    </div>
                }
                {noteDisplay}
            </div>
        );
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
                            noteClicked={() => selectedNoteHandler(note.id)}
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
