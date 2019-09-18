const express = require('express');
const multer = require('multer');
const uploadFolder = '/uploads/images';
const getimage = require('./get-image-url.js');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/uploads/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.png') //Appending .jpg
    }
});
const upload = multer({ storage: storage });

const app = express();
const PORT = 8000;

app.listen(process.env.PORT || PORT, () => {
    console.log('Listening at ' + PORT );
});

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', (req,res) => {
    res.render('upload.html')
});

app.post('/', upload.single('photo'), (req, res) => {
    var homeUrl = req.protocol+"://"+req.headers.host;
    if(req.file) {
        let name = req.file.filename;
        let url = homeUrl + uploadFolder + '/' + name;
        getText(url).then((result) => {
            res.render('test.ejs', {result: result})
        });
    }
    else throw 'error';
});

async function getText(url) {
    console.log('calling');
    var result = await getimage.getText(url);
    return result;
}