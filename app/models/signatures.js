var Collection = require('models/signatureCollection');
var myCollection = new Collection();

//  should return an object that contains the processed signature and the resulting model:
//    null if the signature is refused (duplicate)
//    a new model if the signature is new
//    existing model of the signature is updated
var findValidateAndCreate = function findValidateAndCreate(signature) {
	
	var result = {processedSignature:signature};
	// 1st test if we already have this signature
	var existingSignature = myCollection.findWhere({signatureId: signature.signatureId});
	if (!existingSignature) {
		result.model = myCollection.create(signature);
		result.action = 'create';
	}
	// for now do nothing but later: update
	else {
		result.action = 'duplicate';
	}
	return result;
};

var fetchBysystem = function fetch(sSystemId) {
	myCollection.fetch({data:{systemId: sSystemId}, reset: true});
};

var createAndUpdate = function createAndUpdate(signatures) {
	console.log("create sigs");
	return _.map(signatures, findValidateAndCreate, this);
};

var remove = function remove(signatureId) {
	var signatureToRemove = myCollection.findWhere({signatureId: signatureId});
	if (signatureToRemove) {
		console.log("signature found")
		signatureToRemove.destroy({
			success: function success(){console.log("remove success")},
			error: function error(){console.log("remove error")},
		});
		//myCollection.remove(signatureToRemove);
	}
};

var getInSystem = function getInSystem(systemId) {
	return myCollection.where({systemId: systemId});
};

myCollection.on('change', function(model) {
	Backbone.Mediator.publish('signatures:change', model.toJSON());
	console.log('JORDI CHANGE : ', model);
});

myCollection.on('add', function(model) {
	Backbone.Mediator.publish('signatures:add', model.toJSON());
	console.log('JORDI ADDED : ', model);
});

myCollection.on('sync', function(model) {
	Backbone.Mediator.publish('signatures:sync', model.toJSON());
	console.log('JORDI Sync : ', model);
});

myCollection.on('destroy', function(model) {
	Backbone.Mediator.publish('signatures:destroy', model.toJSON());
	console.log('JORDI destroy : ', model);
});



module.exports.fetchBysystem = fetchBysystem;
module.exports.createAndUpdate = createAndUpdate;
module.exports.remove = remove;
module.exports.getInSystem = getInSystem;