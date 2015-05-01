//var util = require('util');

var signatureParse = function(args) {

  // we could add the basic Informations once in order to save bandwidth
  // but the amount of information is extremely low and this is the final structure for the database
  var basicInformations = _.pick(args, ['characterId', 'systemId', 'date']);

  var finalArray = _(args.rawText.split('\n')).map(function(rawSignature) {
      var splittedText = rawSignature.split('    ');
      return _.extend({
        signatureId: splittedText[0],
        signatureType: splittedText[2],
        signatureName: splittedText[3],
      }, basicInformations);
  });

  return finalArray;
}

module.exports = signatureParse;