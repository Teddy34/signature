module.exports = Backbone.View.extend({

  el: '#root',

  template: require('./templates/home'),

  initialize: function() {
  	console.log("Alerts suck.");
  },

  render: function() {
  	this.$el.html(this.template);
  }

});