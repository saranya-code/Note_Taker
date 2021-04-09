
//Dependencies
const express = require('express');
const path = require("path");
const fs = require("fs");

//PORT
const app = express(); 
const PORT = process.env.PORT || 8000;

//Express app to handle data

app.use(express.urlencoded({extended :true}));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

//Routes

app.get('/',  (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// API for getting data 
app.get('/api/notes', (req,res) =>{
    res.sendFile(path.join(__dirname, './db/db.json'))
});

//Add a new note
app.post('/api/notes', (req,res) =>{
    const existingNotes = fs.readFileSync('./db/db.json', 'utf-8');
    const existingNotesJson = JSON.parse(existingNotes)
    existingNotesJson.push(req.body)
    fs.writeFileSync('./db/db.json', JSON.stringify(existingNotesJson));
    res.json(req.body);
})

// Delete a note using note.id
app.delete('/api/notes/:id', (req,res) => {
    const existingNotes = fs.readFileSync('./db/db.json', 'utf-8');
    const existingNotesJson = JSON.parse(existingNotes)
    let noteId = req.params.id;
    const filteredNotes = existingNotesJson.filter(note => note.id != noteId)
    fs.writeFileSync('./db/db.json', JSON.stringify(filteredNotes));
    res.end();
});

//Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));