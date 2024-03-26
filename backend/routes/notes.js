// Checking importatin from terminal
const express=require('express');
const router=express.Router();
const {body,validationResult}=require('express-validator');

// importing middleware
var fetchUser=require('../middleware/fetchUser');

// importing models 
const Note = require('../models/Note');

// ROUTE 1: Get all the notes using: GET "/api/auth/fetchallnotes" Login required
router.get('/fetchallnote',fetchUser,async (req, res) => {
    try {
        // finding notes
        const notes=await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2: Add notes using: POST "/api/auth/addnote" Login required
router.post('/addnote',fetchUser,[
     // all validations here 
     body('title','Enter a valid title').isLength({min:3}),
     body('description','Description must be 10 characters').isLength({min:10}),
],async (req, res) => {
    try {
        const {title,description,tag}=req.body;
        
        // Check validatin result
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        
        const note=new Note({
            title,description,tag,user:req.user.id
        })
        const savedNote= await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 3: Update existing note using: PUT "/api/auth/updatenote" Login required
router.put('/updatenote/:id',fetchUser,async (req, res) => {
    try {
        const {title,description,tag}=req.body;
        // create a new note object
        const newNote={};
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}

        // Finding note to be updated

        let note=await Note.findById(req.params.id)
        if(!note){return res.status(404).send("NOT FOUND")}
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("NOT ALLOWED");
        }

        note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 4: Delete note using: DELETE "/api/auth/deletenote" Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    
    try {
        // Finding note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {return res.status(404).send("NOT FOUND");}
        
        // Checking deletion user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("NOT ALLOWED");
        }
        
        // Delete the note
        await Note.findByIdAndDelete(req.params.id);
        
        res.json({ "success": "Note has been deleted" });
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
    });


module.exports=router;