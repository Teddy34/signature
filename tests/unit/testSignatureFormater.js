define(function(require) {

var registerSuite = require('intern!object');
var assert = require('intern/chai!assert');
var signatureParser = require('intern/dojo/node!../../app/signatureParser');

registerSuite({
        name: 'format signatures',

        basicAnalysis: function () {
            var rawText ="YJK-344    Cosmic Anomaly    Combat Site    Drone Assembly    100,00%    5,17 AU",
                characterId = "123456789",
                systemId = "98989898",
                date = Date.now(),

                signatures = signatureParser(
                    {
                        rawText: rawText,
                        characterId: characterId,
                        systemId: systemId,
                        date: date
                    });
                
            assert.isArray(signatures, "signatureParser() should return an array");

            assert.isObject(signatures[0], "signatureParser()[0] should return an an object");

            assert.strictEqual(signatures[0].characterId, characterId,
                'signature should maintain the characterId');

            assert.strictEqual(signatures[0].systemId, systemId,
                'signature should maintain the systemId');

            assert.strictEqual(signatures[0].date, date,
                'signature should maintain the date');

            assert.strictEqual(signatures[0].signatureId, 'YJK-344',
                'signature should have identified signatureId as "YJK-344"');

            assert.strictEqual(signatures[0].signatureType, 'Combat Site',
                'signature should have identified signatureType as "Combat Site"');

            assert.strictEqual(signatures[0].signatureName, 'Drone Assembly',
                'signature should have identified signatureId as "Drone Assembly"');

        },

        multilineAnalysis: function() {
            var rawText ="YJK-344    Cosmic Anomaly    Combat Site    Drone Assembly    100,00%    5,17 AU\nVFE-726    Cosmic Anomaly    Ore Site    Large Jaspet, Kernite and Omber Deposit    100,00%    9,15 AU",
                characterId = "123456789",
                systemId = "98989898",
                date = Date.now(),
                signatures = signatureParser(
                    {
                        rawText: rawText,
                        characterId: characterId,
                        systemId: systemId,
                        date: date
                    });

            assert.isArray(signatures, "signatureParser() should return an array");
            assert.strictEqual(signatures.length, 2, "signatureParser() should return an 2 row array");  
            assert.isObject(signatures[0], "signatureParser()[0] should return an an object"); 
            assert.isObject(signatures[1], "signatureParser()[1] should return an an object");
            assert.strictEqual(signatures[1].signatureId, "VFE-726","signatureParser()[1] should return an an object");
        }

    });
});