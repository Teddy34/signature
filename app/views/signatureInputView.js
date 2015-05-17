var signatureParser = require('../misc/signatureParser');

// small helper for test purposes
function makeid()
{
    var text = "";
    var possibleChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var possibleDigit = "0123456789";

    getChar = function(list) {
      return list.charAt(Math.floor(Math.random() * list.length));
    }

    for( var i=0; i < 3; i++ ) {
      text += getChar(possibleChar);
    }

    text += '-';

        for( var i=0; i < 3; i++ ) {
      text += getChar(possibleDigit);
    }

    return text;
}

// definition of a new view directly exported out of the module
module.exports = Backbone.View.extend({

// the template to use for rendering
  template: require('./templates/signatureInput'),

// classic initialize function
  initialize: function() {
    this.buttonLabel = "Add Signatures";
    this.textboxLabel = "Copy paste signatures here";
  },

// function called during the render to get rendering data to feed the template.
  getRenderData: function() {
    return {
      buttonLabel: this.buttonLabel,
      textboxLabel: this.textboxLabel
    };
  },

// list of event handlers based on css selector
  events: {
    "click button[type=button]": "addSignatures"
  },

// render function of the view
  render: function() {
  	this.$el.html(this.template(this.getRenderData()));
    // temporary test default value
    this.testPopulate();
    return this;
  },

  clearInput: function() {
    this.$('textarea').val('');
  },

  testPopulate: function() {
    // temporary test default value
    this.$('textarea').val(makeid() + '    Cosmic Anomaly    Combat Site    Drone Assembly    100,00%    5,17 AU');
  },

// click handler to analyse input
// will update the model
  addSignatures: function(event) {

    console.log("clicked: ", this.$("textarea").val() );
    var applicationModel = require('models/applicationModel');
    // the parser will provide an array of signatures object
    var signatures = signatureParser(    {
                        rawText: this.$("textarea").val(),
                        characterId: applicationModel.get('characterId'),
                        systemId: applicationModel.get('systemId'),
                        date: Date.now()
                    });

    var result = require('../models/signatures').createAndUpdate(signatures);

    this.clearInput();
    this.testPopulate();
  }

});