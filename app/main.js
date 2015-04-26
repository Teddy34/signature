// Singleton de l'application
// ==========================

'use strict';

// L'appli principale.  Reste super basique à ce stade : on a un seul
// écran donc pas de routes spéciales pour plein de trucs, et on
// connecte juste la racine à la Home View.
Backbone.View = Backbone.NativeView;

var Application = {
  initialize: function() {
    var HomeView = require('views/homeView');
    //var Router = require('lib/router');

    this.homeView = new HomeView();
    //this.router = new Router();
	}
};

module.exports = Application;