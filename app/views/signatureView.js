// definition of a new view directly exported out of the module
module.exports = Backbone.View.extend({

// the template to use for rendering
  template: require('./templates/signature'),

// root element of the view
  tagName:'tr',

// classic initialize function
  initialize: function(args) {
    this.sigRegionLabel = args.sigRegionLabel || "region";
    this.sigSystemLabel = args.sigSystemLabel || "system";
    this.sigIDLabel = args.sigIDLabel || "system";
    this.sigTypeLabel = args.sigTypeLabel || "type";
    this.sigNameLabel = args.sigNameLabel || "name";
    this.sigDiscovererLabel = args.sigDiscovererLabel || "discoverer";
    this.tipButtonLabel = "tip";
    this.removeButtonLabel = "remove";
  },

// function called during the render to get rendering data to feed the template.
  getRenderData: function() {
    return {
      sigRegionLabel: this.sigRegionLabel,
      sigSystemLabel: this.sigSystemLabel,
      sigIDLabel: this.sigIDLabel,
      sigTypeLabel: this.sigTypeLabel,
      sigNameLabel: this.sigNameLabel,
      sigDiscovererLabel: this.sigDiscovererLabel,
      tipButtonLabel: this.tipButtonLabel,
      removeButtonLabel: this.removeButtonLabel
    };
  },

// list of event handlers based on css selector
  events: {
    "click .tip-discoverer": "tipDiscoverer",
    "click .remove-signature": "removeSignature",
  },

// render function of the view
  render: function() {
  	this.$el.html(this.template(this.getRenderData()));
    return this;
  },

// click handler for tip button
  tipDiscoverer: function(event) {
    console.log("tipDiscovererclicked: ",this.sigDiscovererLabel);
  },

// click handler for remove signature button
  removeSignature: function(event) {
    console.log("removeSignatureclicked: ", this.sigIDLabel);
    require('../models/signatures').remove(this.sigIDLabel);
  }

});