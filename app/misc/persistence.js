var Collection = require('models/signatureCollection');
var myCollection = new Collection();

var validator = function validator(signature) {
	//to be coded
	return true;
};

var fetchBysystem = function fetch(sSystemId) {
	myCollection.fetch({data:{systemId: sSystemId}, reset: true});
};

var create = function fetch(signatures) {
	console.log("create sigs");
	_.each(signatures, function(signature) {
		console.log("creating: ", signature);
		if (validator(signature)) {
			console.log('adding');
			myCollection.create(signature);
		}
	});
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