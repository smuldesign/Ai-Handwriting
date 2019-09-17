const express = require('express');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

const app = express();
const PORT = 8000;

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});

app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        const url = req.file.destination;
        console.log(url);
    }
    else throw 'error';
});