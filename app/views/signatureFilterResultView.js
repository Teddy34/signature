// child view import
var signatureView = require('./signatureView');
var signatures = require('../models/signatures');
var applicationModel = require('../models/applicationModel');

// definition of a new view directly exported out of the module
module.exports = Backbone.View.extend({

// the template to use for rendering
  template: require('./templates/signatureFilterResult'),

// classic initialize function
  initialize: function(args) {
    _.bindAll(this,'sync');
  },

// render function of the view
  render: function() {
  	this.$el.html(this.template());
    // we defer child execution to the next job( equivalent to a 0ms setTimeout )
    return this;
  },

  subscriptions: {
    'signatures:sync': 'sync',
  },

//  Once current view is added to the dom, we append child view to this view
  sync: function() {
    var $TableBody = this.$('.result-table-root');

    var signaturesInSystem = signatures.getInSystem(applicationModel.get('systemId'));
    console.log("TEST:", signaturesInSystem, applicationModel.get('systemId'));

    _.each(signaturesInSystem, function(oneSignature) {
      $TableBody.append(new signatureView({
        sigRegionLabel: 'Fountain',
        sigSystemLabel: 'YZ-bidule',
        sigIDLabel: oneSignature.sigIDLabel,
        sigTypeLabel: oneSignature.sigTypeLabel,
        sigNameLabel: oneSignature.sigNameLabel,
        sigDiscovererLabel: 'Tethys Luxor',
      }).render().el);
    });

    /*$TableBody.append(new signatureView({
      sigRegionLabel: 'Fountain',
      sigSystemLabel: 'YZ-bidule',
      sigIDLabel: 'ZEL-555',
      sigTypeLabel: 'combat site',
      sigNameLabel: 'sansha prison',
      sigDiscovererLabel: 'Tethys Luxor',
    }).render().el);

    $TableBody.append(new signatureView({
      sigRegionLabel: 'Catch',
      sigSystemLabel: 'W-MPTH',
      sigIDLabel: 'XXD-666',
      sigTypeLabel: 'relic site',
      sigNameLabel: 'sansha monument',
      sigDiscovererLabel: 'Bastien Cash',
    }).render().el);*/
  }

});