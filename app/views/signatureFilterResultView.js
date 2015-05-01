var signatureView = require('./signatureView');

module.exports = Backbone.View.extend({

  template: require('./templates/signatureFilterResult'),

  initialize: function(args) {
    _.bindAll(this,'afterRender');
  },

  events: {
  },

  render: function() {
  	this.$el.html(this.template());
    _.defer(this.afterRender);
    return this;
  },

  afterRender: function() {
    var $TableBody = this.$('.result-table-root');

    $TableBody.append(new signatureView({
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
    }).render().el);
  }

});