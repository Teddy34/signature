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
module.exports.create = create;
module.exports.remove = remove;
module.exports.getInSystem = getInSystem;