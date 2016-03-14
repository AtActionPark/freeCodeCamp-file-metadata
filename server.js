'use strict';
var express = require('express');
var routes = require('./app/routes/index.js');
var mongo = require('mongodb');

require('dotenv').config();
var app = express();


mongo.MongoClient.connect(process.env.MONGO_URI || 'mongodb://user:password@ds011409.mlab.com:11409/atactionparkshortener', function (err, db) {

    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }

    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/common', express.static(process.cwd() + '/app/common'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

    routes(app, db);
    
    db.createCollection("urls", {
    capped: true,
    size: 5242880,
    max: 5000
  });

    var port = process.env.PORT || 8080;
	app.listen(port,  function () {
		console.log('Node.js listening on port ' + port + '...');
	});

});

