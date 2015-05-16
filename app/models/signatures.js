var Collection = require('models/signatureCollection');
var myCollection = new Collection();

var validator = function validator(signature) {
	//to be coded
	return true;
};

var fetchBysystem = function fetch(sSystemId) {
	myCollection.fetch({data:{systemId: sSystemId}, reset: true});
};

var create = function create(signatures) {
	console.log("create sigs");
	_.each(signatures, function(signature) {
		console.log("creating: ", signature);
		if (validator(signature)) {
			console.log('adding');
			myCollection.create(signature);
		}
	});
};

var remove = function remove(signatureId) {
	var signatureToRemove = myCollection.findWhere({signatureId: signatureId});
	if (signatureToRemove) {
		myCollection.remove(signatureToRemove);
	}

};

var getInSystem = function getInSystem(systemId) {
	return myCollection.where({systemId: systemId});
};

myCollection.on('change', function(model) {
	Backbone.Mediator.publish('signature:change', model.toJSON());
	console.log('JORDI CHANGE : ', model);
});

myCollection.on('add', function(model) {
	Backbone.Mediator.publish('signature:new', model.toJSON());
	console.log('JORDI ADDED : ', model);
});


module.exports.fetchBysystem = fetchBysystem;
module.exports.create = create;
module.exports.remove = remove;
module.exports.getInSystem = getInSystem;