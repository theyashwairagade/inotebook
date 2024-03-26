import React, { useContext, useEffect,useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
const Notes = () => {
    const context=useContext(noteContext);
    const{notes,getNotes}=context;
    useEffect(()=>{
      getNotes()
    },[])
    const updateNote=(note)=>{
      ref.current.click();
    }
    const ref=useRef(null)
  return (
    <>
    <AddNote/>
    <button type="button" ref={ref} class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Launch demo modal
    </button>
    <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Note</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">Save changes</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row my-3">
        <h1>Your notes</h1>
        {notes.map((note)=>{
          return <NoteItem key={note._id} updateNote={updateNote} note={note}/>;
        })}
    </div>
    </>
  )
}

export default Notes
