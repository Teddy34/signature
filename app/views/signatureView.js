module.exports = Backbone.View.extend({

  template: require('./templates/signature'),

  tagName:'tr',

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

  events: {
    "click .tip-discoverer": "tipDiscoverer",
    "click .remove-signature": "removeSignature",
  },

  render: function() {
  	this.$el.append(this.template(this.getRenderData()));
    return this;
  },

  tipDiscoverer: function(event) {
    console.log("tipDiscovererclicked: ",this.sigDiscovererLabel);
  },

  removeSignature: function(event) {
    console.log("removeSignatureclicked: ", this.sigIDLabel);
  }

});