// Application entry point
// =========================

'use strict';

// load our application
var application = require('main');

(function() {
  application.initialize();
  Backbone.history.start();
}());