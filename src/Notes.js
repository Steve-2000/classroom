import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from './firebase';
import './Notes.css'

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [error, setError] = useState(null);
    const user = auth.currentUser;

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/notes/${user.email}`);
                setNotes(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        if (user) {
            fetchNotes();
        }
    }, [user]);

    const handleAddNote = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/notes', {
                userId: user.uid,
                email: user.email,
                content: newNote,
            });
            setNotes([...notes, response.data]);
            setNewNote('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/notes/${id}`);
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="notes-container">
            <div className="notes-form">
                <h1>Your Notes</h1>
                {error && <p>{error}</p>}
                <form onSubmit={handleAddNote}>
                    <textarea
                        className="notes-textarea"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Write your note here..."
                    />
                    <button className="notes-button" type="submit">Add Note</button>
                </form>
            </div>
            <ul className="notes-list">
                {notes.map(note => (
                    <li className="notes-item" key={note._id}>
                        <p>Content: {note.content}</p>
                        <p>Created At: {new Date(note.createdAt).toLocaleString()}</p>
                        <button className="notes-delete-button" onClick={() => handleDeleteNote(note._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;
