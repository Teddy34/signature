// Collection : Check-Ins
// ======================

'use strict';

// Définition de la collection qu'on va employer (collection
// Backbone de check-ins).  On exploite ici plusieurs aspects
// pratiques des collections Backbone.

module.exports = Backbone.Collection.extend({
  // Définition du modèle à exploiter lors d'ajouts, fetches, etc.
  // Du coup, on peut passer juste des hashes d'attributs, ça
  // convertit tout seul.
  model: require('./signatureModel'),

  // URL de base pour la persistence.  Fort utile pour la couche
  // de synchro par défaut de Backbone, qui va la décliner suivant
  // les principes REST.
  url: '/api/v1/signatures',

  // Comparateur inhérent, qui sera donc utilisé automatiquement
  // après toute modif des éléments pour maintenir la collection
  // triée (la classe !).
  comparator: function(c1, c2) {
    return +c2.get('key') - +c1.get('key');
  }
});
