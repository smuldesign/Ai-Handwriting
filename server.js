const express = require('express');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});
const getimage = require('./get-image-url.js');

const app = express();
const PORT = 8000;

app.listen(process.env.PORT || PORT, () => {
    console.log('Listening at ' + PORT );
});

app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        let url = JSON.stringify(req.file.path);
        console.log(url);
        getimage.getText(url);
    }
    else throw 'error';
});