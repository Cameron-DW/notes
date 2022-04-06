import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Note from './components/Note/Note';
import INote from './interfaces/note.interface';
import {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
} from './services/notesService';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';

function App() {
  const [notesList, setNotesList] = useState<Array<INote>>([]);

  // Modal
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);

  // new Note
  const [newNote, setNewNote] = useState<Partial<INote>>({
    text: '',
    link: '',
  });

  const handleCloseAddModal = () => {
    setShowAddNoteModal(false);
    setNewNote({
      text: '',
      link: '',
    });
  };
  const handleShowAddModal = () => setShowAddNoteModal(true);

  const updateNoteItem = async (updatedNote: INote) => {
    await updateNote(updatedNote);
    //console.log(updatedNote);

    const updatedList = notesList.map((noteItem) => {
      if (noteItem._id === updatedNote._id) {
        return updatedNote;
      }
      return noteItem;
    });

    setNotesList(updatedList);
  };

  const deleteNoteItem = async (noteToDelete: INote) => {
    // this doesnt return deletedNote it just returns a json message saying confirmed deletion
    const deletedNote = await deleteNote(noteToDelete._id);
    const newlist = notesList.filter((note) => note._id != noteToDelete._id);
    setNotesList(newlist);
  };

  const addNote = async () => {
    const savedNote = await createNote(newNote);
    setNotesList([...notesList, savedNote]);
    handleCloseAddModal();
  };

  // initial setting of Notes From Backend
  useEffect(() => {
    getNotesFromServer();
  }, []);

  const getNotesFromServer = async () => {
    const notes = await getNotes();
    setNotesList(notes);
  };

  return (
    <div className='App'>
      {/*Creating the Modal */}
      <Button variant='dark' className='add-btn' onClick={handleShowAddModal}>
        <div className='add-btn-text'>+</div>
      </Button>

      <Modal show={showAddNoteModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* the form for text input */}
          <FloatingLabel
            controlId='floatingTextArea'
            label='Add Text'
            className='note-text'
          >
            <Form.Control
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  text: newVal,
                });
              }}
              type='textarea'
              placeholder='Add Text'
            />
          </FloatingLabel>
          <FloatingLabel
            controlId='floatingTextArea'
            label='Add Link'
            className='note-link'
          >
            <Form.Control
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  link: newVal,
                });
              }}
              type='url'
              placeholder='Add Link'
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant='primary' onClick={addNote}>
            Create Note
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='notes-list'>
        {notesList.map((noteItem, index) => {
          return (
            <Note
              note={noteItem}
              key={index}
              onNoteUpdate={updateNoteItem}
              onNoteDelete={deleteNoteItem}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
