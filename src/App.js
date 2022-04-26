import React, { useState, useEffect } from "react";
import "./App.css";

import Preview from "./components/preview/Preview";
import Message from "./components/message";
import NotesContainer from "./components/notes/NotesContainer";
import NotesList from "./components/notes/NotesList";
import Note from "./components/notes/Note";
import NoteForm from "./components/notes/NoteForm";
import Alert from "./components/Alert";


function App() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedNote, setSelectedNote] = useState(null);
    const [creating, setCreating] = useState(false);
    const [editing, setEditing] = useState(false);
    const [validationErrors, setValidationError] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("notes")) {
            setNotes(JSON.parse(localStorage.getItem("notes")));
        } else {
            localStorage.setItem("notes", JSON.stringify([]));
        }
    }, []);

    useEffect(() => {
        if (validationErrors.length > 0) {
            setTimeout(() => {
                setValidationError([]);
            }, 2000);
        }
    }, [validationErrors]);

    const saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const validate = () => {
        const validationErrors = [];
        let passed = true;
        if (!title) {
            validationErrors.push("Please enter the title of the note");
            passed = false;
        }
        if (!content) {
            validationErrors.push("Please enter the content of the note");
            passed = false;
        }
        setValidationError(validationErrors);
        return passed;
    };

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
        if (!validate()) return;

        const note = {
            id: new Date(),
            title: title,
            content: content,
        };

        const updateNotes = [...notes, note];

        saveToLocalStorage("notes", updateNotes);
        setNotes(updateNotes);
        setCreating(false);
        setSelectedNote(note.id);
        setTitle("");
        setContent("");
    };

    //select note
    const selectedNoteHandler = (noteId) => {
        setSelectedNote(noteId);
        setCreating(false);
        setEditing(false);
    };

    // Edit note
    const editNoteHandler = (noteId) => {
        const note = notes.find((note) => note.id === noteId);

        setEditing(true);
        setTitle(note.title);
        setContent(note.content);
    };

    // update note
    const updateNoteHandler = () => {
        if (!validate()) return;
        const updateNotes = [...notes];
        const noteIndex = notes.findIndex((note) => note.id === selectedNote);
        updateNotes[noteIndex] = {
            id: selectedNote,
            title: title,
            content: content,
        };
        saveToLocalStorage("notes", updateNotes);
        setNotes(updateNotes);
        setEditing(false);
        setTitle("");
        setContent("");
    };

    // add note
    const addNoteHandler = () => {
        setCreating(true);
        setEditing(false);
        setTitle("");
        setContent("");
    };

    // delete note
    const deleteNoteHandler = () => {
        const updateNotes = [...notes];
        const noteIndex = updateNotes.findIndex(
            (note) => note.id === selectedNote
        );
        notes.splice(noteIndex, 1);
        saveToLocalStorage("notes", notes);
        setNotes(notes);
        setSelectedNote(null);
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
            return <Message title="select a note" />;
        }

        const note = notes.find((note) => {
            return note.id === selectedNote;
        });

        let noteDisplay = (
            <div>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
            </div>
        );

        if (editing) {
            noteDisplay = (
                <NoteForm
                    fromTitle="edit Note"
                    title={title}
                    content={content}
                    titleChanged={changeTitleHandler}
                    contentChanged={changeContentHandler}
                    submitText="edit"
                    submitClicked={updateNoteHandler}
                />
            );
        }
        return (
            <div>
                {!editing && (
                    <div className="note-operations">
                        <a href="#" onClick={() => editNoteHandler(note.id)}>
                            <i className="fa fa-pencil-alt" />
                        </a>
                        <a href="#" onClick={deleteNoteHandler}>
                            <i className="fa fa-trash" />
                        </a>
                    </div>
                )}
                {noteDisplay}
            </div>
        );
    };

    return (
        <div className="App">
            <div className="notes">
                <div className="notes__sidebar">
                    <NotesContainer className="notes__sidebar">
                        <button className="add-note" onClick={addNoteHandler}>
                            Add Note
                        </button>
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
                    </NotesContainer>
                </div>
                <div className="notes__preview">
                    <Preview>{creating ? getAddNote() : getPreview()}</Preview>
                    {validationErrors.length !== 0 && (
                        <Alert validationMessages={validationErrors} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
