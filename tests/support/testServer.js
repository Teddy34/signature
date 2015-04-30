var util = require('util');

var mongoose   = require('mongoose');
//mongoose.set('debug', true);

	var signatureParser = require('../../app/signatureParser');
	var signature = require('../../server/models/signature');

var get = function() {
	signature.getBySystems(['YJK-344'], function(err, docs) {
		console.log('result');
		console.log(util.inspect(docs));
	});

}

var getAll = function() {
	signature.getAll(function(err, docs) {
		console.log('result');
		console.log(util.inspect(docs));
		/*var _ = require('lodash');
		var toRem = _.pluck(docs, 'signatureId');
		signature.remove(toRem, function(err) {
			console.log("removed :",!err);
		});*/
	});
}

var add = function(sigs) {
	signature.add(sigs, function() {
		console.log("added");
		console.log(util.inspect(arguments));
	});
}

var start = function() {

	var rawSig = 'YJK-344    Cosmic Anomaly    Combat Site    Drone Assembly    100,00%    5,17 AU\nVFE-726    Cosmic Anomaly    Ore Site    Large Jaspet, Kernite and Omber Deposit    100,00%    9,15 AU\nIMZ-064    Cosmic Anomaly    Combat Site    Sansha Hideaway    100,00%    42,13 AU\nWDD-080    Cosmic Anomaly    Ore Site    Small Kernite and Omber Deposit    100,00%    3,84 AU\nRGU-590    Cosmic Anomaly    Ore Site    Asteroid Belt Remnants    100,00%    16,35 AU';

	var mySig = signatureParser({rawText:rawSig});
	//console.log(util.inspect(mySig));

	add(mySig);
	//getAll();
}

mongoose.connect(require('../../server/databaseCredentials'), function(err) {
    if (err) {
    	console.log('err:',util.inspect(err));
    	throw err;
    } else 
    {
    	console.log("connected");
    	start();
    }
}); // connect to our database