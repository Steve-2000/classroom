import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from './firebase'; // Import the Firestore instance
import './About.css'; // Import the CSS file for styling

const About = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      if (user) {
        const q = query(collection(firestore, "notes"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        setNotes(querySnapshot.docs.map(doc => doc.data()));
      }
    };

    fetchNotes();
  }, [user]);

  const handleAddNote = async () => {
    if (!user) {
      setError('You must be logged in to add notes.');
      return;
    }

    if (newNote.trim() === '') {
      setError('Note cannot be empty.');
      return;
    }

    try {
      await addDoc(collection(firestore, "notes"), {
        userId: user.uid,
        text: newNote.trim(),
        timestamp: new Date(),
      });
      setNewNote('');
      setError('');
      // Fetch notes again after adding a new note
      const q = query(collection(firestore, "notes"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      setNotes(querySnapshot.docs.map(doc => doc.data()));
    } catch (e) {
      setError('Failed to add note.');
    }
  };

  return (
    <div className="about-container">
      <h1>About Page</h1>
      {error && <p className="error">{error}</p>}
      {user ? (
        <div>
          <input
            type="text"
            placeholder="Add a new note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button onClick={handleAddNote}>Add Note</button>
          <ul>
            {notes.map((note, index) => (
              <li key={index}>{note.text}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Please log in to manage your notes.</p>
      )}
    </div>
  );
};

export default About;
