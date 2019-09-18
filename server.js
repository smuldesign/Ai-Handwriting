const express = require('express');
const multer = require('multer');
const uploadFolder = '/uploads/images';
const upload = multer({dest: __dirname + '/public/uploads/images'});
const getimage = require('./get-image-url.js');

const app = express();
const PORT = 8000;

app.listen(process.env.PORT || PORT, () => {
    console.log('Listening at ' + PORT );
});

app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
    var homeUrl = req.protocol+"://"+req.headers.host;
    if(req.file) {
        let name = JSON.stringify(req.file.filename);
        let url = homeUrl + uploadFolder + '/' + name;
        console.log(url);
    }
    else throw 'error';
});