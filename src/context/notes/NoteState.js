import noteContext from "./noteContext";
import { useState } from "react";
// require('dotenv').config();
const NoteState = (props) => {
    const host="http://localhost:5000"
    // const host=process.env.HOST;
    const notesInitial=[]

      const [notes, setNotes] = useState(notesInitial);

      // Add a note
      const addNote=async(title,description,tag)=>{
        console.log("Got title "+title);
        console.log("Got description "+description);
        console.log("Got tag "+tag);
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5YmUwNGM5ZDRlMTJiZTg1MWQyYmRhIn0sImlhdCI6MTcwNDkxMzM4MH0.1AXCvl646zW1-MDX9HoHu2pa_t8dVeQfPymtThLhFOM"
          },
          body: JSON.stringify({title,description,tag})
        });

        console.log("Adding a new note");
        const note={
          "_id": "65a523b338dbre54fvdfv533b2e97de",
          "user": "659be04c9d4e12be851d2bda",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2024-01-15T12:23:15.732Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }
      
      // Fetch all notes
      const getNotes=async()=>{
        const response = await fetch(`${host}/api/notes/fetchallnote`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5YmUwNGM5ZDRlMTJiZTg1MWQyYmRhIn0sImlhdCI6MTcwNDkxMzM4MH0.1AXCvl646zW1-MDX9HoHu2pa_t8dVeQfPymtThLhFOM"
          }
        });
        const json=await response.json()
        console.log(json)
        setNotes(json)
      }

      // Delete a note
      const deleteNote=async(id)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5YmUwNGM5ZDRlMTJiZTg1MWQyYmRhIn0sImlhdCI6MTcwNDkxMzM4MH0.1AXCvl646zW1-MDX9HoHu2pa_t8dVeQfPymtThLhFOM"
          }
        });
        const json= await response.json();

        // Logic to edit in client
        console.log("deleting "+id);
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
      }

      // Edit a note
      const editNote=async(id,title,description,tag)=>{
        // TODO: API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5YmUwNGM5ZDRlMTJiZTg1MWQyYmRhIn0sImlhdCI6MTcwNDkxMzM4MH0.1AXCvl646zW1-MDX9HoHu2pa_t8dVeQfPymtThLhFOM"
          },
          body: JSON.stringify({title,description,tag})
        });
        const json= await response.json();

        // Logic to edit in client  
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id===id){
            element.title=title;
            element.description=description;
            element.tag=tag;
          }
        }
      }


      return (
        <noteContext.Provider value={{ notes, addNote,deleteNote,editNote,getNotes}}>
          {props.children}
        </noteContext.Provider>
      );
    };
    
    export default NoteState;