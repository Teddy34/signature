// Router
// =======

'use strict';

var application = require('main');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home'
  },

  home: function() {
    application.homeView.render();
  }
});