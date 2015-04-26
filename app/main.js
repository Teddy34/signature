// Singleton de l'application
// ==========================

'use strict';

var Application = {
  initialize: function() {
    var HomeView = require('views/homeView');
    var Router = require('controllers/router');

    this.homeView = new HomeView();
    this.router = new Router();
	}
};

module.exports = Application;