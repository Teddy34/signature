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
  }

});