import './Note.css';
import INote from '../../interfaces/note.interface';
import { FC, FocusEvent, useState } from 'react';

type Props = {
  note: INote;
  onNoteUpdate: (note: INote) => void;
  onNoteDelete: (note: INote) => void;
};

const Note: FC<Props> = ({ note, onNoteUpdate, onNoteDelete }) => {
  const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
    const newTextValue = event.currentTarget.textContent;
    if (newTextValue !== note.text) {
      const updatedNoteObject: INote = {
        ...note,
        text: newTextValue || '',
      };
      onNoteUpdate(updatedNoteObject);
    }
  };

  return (
    <div className='note'>
      <button
        type='button'
        className='btn-close'
        aria-label='Close'
        onClick={() => onNoteDelete(note)}
      ></button>
      <div
        onBlur={noteTextUpdated}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className='note__text'
      >
        {note.text}
      </div>
      <div className='note__link'>
        <a href={note.link}>{note.link}</a>
      </div>
    </div>
  );
};

export default Note;
