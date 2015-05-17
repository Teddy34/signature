// Singleton de l'application
// ==========================

'use strict';

var Application = {
  initialize: function() {
    var HomeView = require('views/homeView');
    var Router = require('misc/router');
    var signatures = require('models/signatures');

    var applicationModel = require('models/applicationModel');

	// sample values
    applicationModel.set({
    	characterId: '123456',
    	systemId: '987654'
    });

    signatures.fetchBysystem(applicationModel.get('systemId'));

    this.homeView = new HomeView();
    this.router = new Router();
	}
};

module.exports = Application;