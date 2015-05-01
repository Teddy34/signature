var signatureInputView = require('./signatureInputView');
var signatureView = require('./signatureView');

module.exports = Backbone.View.extend({

  el: 'body',

  template: require('./templates/home'),

  initialize: function() {
  	console.log("Alerts suck.");
  	this.iconSite = "images/brave-collective-logo.png";
  	this.siteName = "Spoutnik";
  	this.iconOwnerPortrait = "images/brave-collective-logo.png";
  	this.ownerDisclaimer = "Created by Tethys Luxor";
  	this.ccpDisclaimer = "All Eve Online materials belongs to CCP";
  	this.specialThanksDisclaimer = "Special thanks to Exploration Frontier Inc.";
    _.bindAll(this,'afterRender');
  },

  getRenderData: function() {
    return {
      iconSite: this.iconSite,
      siteName: this.siteName,
      iconOwnerPortrait: this.iconOwnerPortrait,
      ownerDisclaimer: this.ownerDisclaimer,
      ccpDisclaimer: this.ccpDisclaimer,
      specialThanksDisclaimer: this.specialThanksDisclaimer,
    };
  },

  render: function() {
  	this.$el.html(this.template(this.getRenderData()));
    _.defer(this.afterRender);
    return this;
  },

  afterRender: function() {
    new signatureInputView({el: this.$('#input-root')}).render();
    var $TableBody = this.$('#result-table-root');

    $TableBody.append(new signatureView({
      sigRegionLabel: 'Fountain',
      sigSystemLabel: 'YZ-bidule',
      sigTypeLabel: 'combat site',
      sigNameLabel: 'sansha prison',
      sigDiscovererLabel: 'Tethys Luxor',
    }).render().el);

    $TableBody.append(new signatureView({
      sigRegionLabel: 'Catch',
      sigSystemLabel: 'W-MPTH',
      sigTypeLabel: 'relic site',
      sigNameLabel: 'sansha monument',
      sigDiscovererLabel: 'Bastien Cash',
    }).render().el);
  }

});