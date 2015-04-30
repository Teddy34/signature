var mongoose     = require('mongoose');

var signatureSchema = new mongoose.Schema( {
        signatureId: String,
        signatureType: String,
        signatureName: String,
        timeStamp: Date,
        characterId: String,
        systemId: String,
      });

module.exports = mongoose.model('Signature', signatureSchema);