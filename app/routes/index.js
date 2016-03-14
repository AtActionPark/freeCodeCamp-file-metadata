'use strict';

var UrlHandler = require(process.cwd() + '/app/controllers/urlHandler.server.js');

module.exports = function(app,db){
	var urlHandler = new UrlHandler(db);
	
	app.route('/')
		.get(function(req,res){
			res.sendFile(process.cwd()+'/public/index.html');
		});
		
	app.route('/new/:q*')
		.get(urlHandler.storeUrl);

	app.route('/:q')
		.get(urlHandler.getUrl);
};

