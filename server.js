const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/api/notes', (req, res) => {
    const notes = fs.readFileSync('./Develop/db/db.json', 'utf8')
    console.log(notes);
    res.json(JSON.parse(notes));

});


app.post('/api/notes', (req, res) => {
    let notes = fs.readFileSync('./Develop/db/db.json', 'utf8')
    notes = JSON.parse(notes)
    req.body.id = uuid.v4();

    notes.push(req.body);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify(notes, null, 2)
    );


    res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {

    const notes = JSON.parse(fs.readFileSync('./Develop/db/db.json'));

    const removeNote = notes.filter((deleteNote) => deleteNote.id !== req.params.id);
    console.log(removeNote)
    fs.writeFileSync('./Develop/db/db.json', JSON.stringify(removeNote));
    res.json(removeNote);

});


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}`);
});