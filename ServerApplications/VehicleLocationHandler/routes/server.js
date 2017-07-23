var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb');
var assert = require('assert');
var url = 'mongodb://127.0.0.1:27017/test';

/* GET home page. */

router.post('/', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    //console.log("Server post request!");
  	//console.log(req.body);
  	assert.equal(null, err);
  	db.collection('GTFS').findOne({"tripid":req.body.tripId}, function(err, document) {
  		//console.log(document.isvalid);
  		if(document.isvalid == null) {
  			db.collection('GTFS').update({"tripid":req.body.tripId},{$set:{isvalid:true}}, function(err, result) {
  				console.log(err);
  			});
  		}
  		db.collection('GTFS').update({"tripid":req.body.tripId},{$set:{"currentlocation":{"lat":req.body.lat,"lon":req.body.lon}}}, function(err, result) {
  			console.log(err);
  		});
	});
  	//db.close();
  });
  res.send('Ok');
});

module.exports = router;
