'use strict';

var UrlHandler = require(process.cwd() + '/app/controllers/urlHandler.server.js');

module.exports = function(app,db,search){
	var urlHandler = new UrlHandler(db,search);
	
	app.route('/')
		.get(function(req,res){
			res.sendFile(process.cwd()+'/public/index.html');
		});
		
	app.route('/api/imagesearch/:q')
		.get(urlHandler.getQuery);
		
	app.route('/api/latest/imagesearch')
		.get(urlHandler.getLatest);

};

