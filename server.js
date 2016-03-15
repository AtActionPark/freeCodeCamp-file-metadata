'use strict';
var express = require('express');

var multer = require('multer')
var upload = multer({ dest: 'uploads/' }).single('userFile')
require('dotenv').config();
var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req,res){
	res.sendFile(process.cwd()+'/public/index.html');
});

app.post('/',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("Size :" + req.file.size + " bytes");
    });
});


var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});



