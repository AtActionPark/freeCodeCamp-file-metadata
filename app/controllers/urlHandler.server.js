'use strict'

var sourceUrl = "https://sleepy-fortress-70363.herokuapp.com/";

function urlHandler(db){
	var urls = db.collection('urls');
	
    this.storeUrl = function(req,res){
    	console.log('store Url')
	   	console.log(req.params)
	   	console.log(req.query)
		var url = req.params.q + req.params['0'];
		if(!validateURL(url)){
			res.send('not a valid url');
			return;
		}
	 	urls.count(function(err,count){
	 		if(err)
	 			throw err;
			urls.insert({
	   		'url':req.params.q + req.params['0'],
	   		'counter': count,
	   		'shorturl': sourceUrl + count
	   		},
	   		function(err,result){
				if(err)
					throw err;
				var r = {
					url: result['ops'][0]['url'],
					shorturl: result['ops'][0]['shorturl']
					};
	         res.json(r);
			});
		});
    };
   
   this.getUrl = function(req,res){
   	console.log(req.params)
   		if(req.params.q =='favicon.ico')
   			return
   		console.log('get Url')
   		console.log(req.params)
		console.log(req.query)

   		urls.findOne({counter: parseInt(req.params.q,10)},function(err,result){
   		if(err)
				throw err;
		console.log(result['url'])
		res.redirect(result['url']);
   		});
    };
   
   var validateURL = function(url) {
    // Checks to see if it is an actual url
    // Regex from https://gist.github.com/dperini/729294
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
  };
}

module.exports = urlHandler;