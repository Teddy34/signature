var signatureParser = require('../signatureParser');

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
    this.$('textarea').val('YJK-344    Cosmic Anomaly    Combat Site    Drone Assembly    100,00%    5,17 AU');
    return this;
  },

  addSignatures: function(event) {
    console.log("clicked: ", this.$("textarea").val() );
    var signatures = signatureParser(    {
                        rawText: this.$("textarea").val(),
                        characterId: "13456",
                        systemId: "987654",
                        date: Date.now()
                    });

    console.log(signatures);
  }

});