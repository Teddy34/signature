// Point d'entrée de l'appli
// =========================

'use strict';

// L'initialiseur applicatif.  Se contente de faire deux choses :
//
// 1. Instancier l'application JS et l'initialiser
// 2. Activer la gestion des routes Backbone (même si on ne s'en
//    sert pas particulièrement ici)

var application = require('main');

(function() {
  application.initialize();
  Exoskeleton.history.start();
}());