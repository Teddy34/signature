module.exports = Backbone.View.extend({

  template: require('./templates/signatureInput'),

  initialize: function() {
    this.buttonLabel = "Add Signatures";
    this.textboxLabel = "Copy paste signatures here";
    console.log("initialize:", this.$el);
  },

  getRenderData: function() {
    return {
      buttonLabel: this.buttonLabel,
      textboxLabel: this.textboxLabel
    };
  },

  events: {
    "click button[type=button]": "addSignatures"
  },

  render: function() {
    console.log("rendering signature input view: ",this.template());
  	this.$el.html(this.template(this.getRenderData()));
    return this;
  },

  addSignatures: function(event) {
    console.log("clicked");
    console.log(event);
  }

});