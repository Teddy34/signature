module.exports = Backbone.View.extend({

  template: require('./templates/signatureInput'),

  initialize: function() {
  },

  render: function() {
  	this.$el.html(this.template);
  }

});