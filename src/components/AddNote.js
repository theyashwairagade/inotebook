import React, { useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';
const AddNote = () => {
    const context=useContext(noteContext);
    const{addNote}=context;
    const [note,setNote]=useState({"title":"","description":"","tag":""})

    const handleclick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div className="container my-3">
        <h1>Add a note</h1>
        <form>
        <div className="form-group">
            <label htmlFor="title">title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="description">description</label>
            <input type="text" className="form-control" name="description" id="description" placeholder="Enter description" onChange={onChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="tag">tag</label>
            <input type="text" className="form-control" name="tag" id="tag" placeholder="Enter tag" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
        </form>
    </div>
  )
}

export default AddNote
