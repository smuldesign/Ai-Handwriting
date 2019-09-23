const express = require('express');
const multer = require('multer');
const uploadFolder = '/uploads/images';
const getimage = require('./get-image-url.js');
const ejs = require('ejs')

const pdf = require("pdf-creator-node");
const fs = require('fs');

const html = fs.readFileSync('./public/template.html', 'utf8');


var bodyParser = require('body-parser');

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

let data;

app.listen(process.env.PORT || PORT, () => {
    console.log('Listening at ' + PORT );
});

app.use(express.static('public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.json());       // to support JSON-encoded bodies
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', (req,res) => {
    res.render('upload.html')
});

app.get('/upload', (req,res) => {
    if (!data) {
        res.redirect('/');
    }
    res.render('test.ejs', {result: data})
});

app.post('/', upload.single('photo'), (req, res) => {
    var homeUrl = req.protocol+"://"+req.headers.host;
    if(req.file) {
        let name = req.file.filename;
        let url = homeUrl + uploadFolder + '/' + name;
        // let url =  'https://i.ytimg.com/vi/_hNIFWGiI_c/maxresdefault.jpg';
        getText(url)
            .then((result) => {
            result = JSON.parse(result);
            data = result;
            res.redirect('/upload')
        }).catch(function(error) {
                console.error(error);
            });
    }
    else throw 'error';
});

var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm"
};
var users = [
    {
        name:"Shyam",
        age:"26"
    },
    {
        name:"Navjot",
        age:"26"
    },
    {
        name:"Vitthal",
        age:"26"
    }
];
var document = {
    html: html,
    data: {
        users: users
    },
    path: "./output.pdf"
};

app.post('/upload', (req, res) => {
    console.log(req.body);
    pdf.create(document, options)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        });
});

async function getText(url) {
    console.log('calling');
    return await getimage.getText(url);
}