'use strict'

var sourceUrl = "https://frozen-sands-55962.herokuapp.com/";
var Search = require('bing.search');
var util = require('util')

function urlHandler(db){
	var queries = db.collection('queries');
	var search = new Search(process.env.BING_KEY);
    
    this.getQuery = function(req,res){
    	var query = req.params.q
    	if (query == 'favicon.ico') 
    		return;

    	var size = req.query.offset;
    	queries.insert({
	   		'term': query,
	   		'when': new Date().toLocaleString()
	   		},
	   		function(err,result){
				if(err)
					throw err;
				search.images(query,
				  {top: 5+size},
				  function(err, results) {
				  	if(err) throw err;
				  	var result = [];
				  	for(var i = 0;i<results.length;i++){
				  		var r = {
					  		imageUrl: results[i].url,
					  		altText: results[i].title,
					  		sourceUrl: results[i].sourceUrl
					  	};
					  	result.push(r);
				  	}
				    res.send(result);
				  }
				);
			});
    };
    
    this.getLatest= function(req,res){
		var cursor = queries.find({},null,{"limit":10, "sort": {"when": -1}});
		var result = []
		cursor.each(function(err, doc) {
        if(err)
            throw err;
        if (doc === null) {
            // doc is null when the last document has been processed
            res.send(result);
            return;
        }
        // do something with each doc, like push Email into a results array
        result.push({term: doc.term, when:doc.when});
    });
	}
   		
}

module.exports = urlHandler;