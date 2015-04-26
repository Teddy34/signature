var url = require('url');
var path = require('path');
var request = require('request');

try{
  var credentials = require('./ccpCredentials.js');
} catch(e) {
  console.log(
    'Failed to find EVE SSO app credentials\n'
   +'Edit credentials-demo.js and save as credentials.js.\n'
   +'Get credentials at:\n'
   +'https://developers.testeveonline.com/resource/single-sign-on'
  );
  throw('No credentials.js')
}

// Global Vars:
var EVE_SSO_CLIENTID = credentials.client_id;
var EVE_SSO_SECRET = credentials.client_secret;
var EVE_SSO_CALLBACK_URL = credentials.callback_url; 
// callback URL must match both CCP website and path in router
// dev note: noscript prevents redirection to localhost URI's

// Set the authentication server. As of 2014-10-06, only the Singularity test server is available.
//var EVE_SSO_HOST = 'login.eveonline.com';
var EVE_SSO_HOST = 'login.eveonline.com';

// Set a string that identifies your app as the user agent:
var MY_USER_AGENT = 'express 4.9.5, eve-sso-demo 0.2.0, EVE client_id ' + EVE_SSO_CLIENTID;

var beginSSO = function(req, res){

  // example oauth start URI, from CCP docs (linked at top):
  // https://
  //    login.eveonline.com
  //       /oauth/authorize/
  //          ?response_type=code
  //          &redirect_uri=https://3rdpartysite.com/callback
  //          &client_id=3rdpartyClientId
  //          &scope=
  //          &state=uniquestate123

  var urlObj = {
    protocol: 'https',
    host: EVE_SSO_HOST,
    pathname: '/oauth/authorize',
    query:{
      response_type: 'code',
      redirect_uri: EVE_SSO_CALLBACK_URL,  // This must exactly match what you set on CCP's site
      client_id: EVE_SSO_CLIENTID,
      scope: '',
      state: 'my non-unique state',        // use a unique per-request value in CSRF defense, i guess?
    },
  };

  // Use node's url library to assemble the URL:
  var ssoBeginURL = url.format(urlObj);

  // User agent was already set by previous middleware. Redirect user to EVE_SSO_HOST:
  res.redirect(302, ssoBeginURL);
};

var callbackSSO = function(req, res){
  //console.log('Got redirected to /evesso/callback by CCP')

  var authCode = req.query['code'];

  // STEP 3. We have a one-time-use auth code from CCP in the /evesso/callback query string.
  // We must make a request with our secret and code, to get a token for this user:
  requestToken(authCode, function(err, response3, bodyObj){
    // Now that we're in this callback, requestToken() completed its request/response.

    if (!err && response3.statusCode == 200) {
      var token = bodyObj.access_token;

      // STEP 4. We have a token from /oauth/token
      // We must make a request with the token to get CharacterID:
      requestCharacterID(token, function(err, response4, bodyObj){
        // Now that we're in this callback, requestCharacterID() completed its request/response.
        if (!err && response4.statusCode == 200) {
          var charId = bodyObj.CharacterID;
          var charName = bodyObj.CharacterName;
          console.log('Welcome, '+charName+'... to PANTHEON');
          res.status(200).send("success");
        } else {
          console.log(err);
          console.log(response4.body);
          console.log('Authentication error!')
          return res.status(500).send("failure");
        }
      });
    } else {
      console.log(err);
      console.log(response3.body);
      console.log('Authentication error!')
      return res.status(500).send(failure);
    }
  });
};

/* 
 *  HELPER FUNCTIONS
 *    Placed down here to help keep routes legible
 */

function requestToken(authCode, callback){
  // Build URL for token request:
  var urlObj = {
    protocol: 'https',
    host: EVE_SSO_HOST,
    pathname: '/oauth/token',
  }
  var ssoTokenUrl = url.format(urlObj);

  // Build the authentication string:
  var tokenAuthHeaderString = 
    "Basic "
    + base64ify(EVE_SSO_CLIENTID + ":" + EVE_SSO_SECRET);

  // Set up options for the post request:
  var postOptions = {
    url: ssoTokenUrl,
    headers:{
      "Authorization": tokenAuthHeaderString,
      //"Host": EVE_SSO_HOST,
      "User-Agent": MY_USER_AGENT,
    },
    form:{
      grant_type: "authorization_code",
      code: authCode,
    }
  }

  // Send request:
  request.post(postOptions, function (err, response, body) {
    // Handle response:
    if (!err && response.statusCode == 200) {
      var bodyObj = JSON.parse(body);
      callback(null, response, bodyObj)
    } else {
      callback(err, response);
      //console.log(response);
    }
  })
}

function requestCharacterID(token, callback){
  // Build URL for verify request:
  var urlObj = {
    protocol: 'https',
    host: EVE_SSO_HOST,
    pathname: '/oauth/verify',
  }
  var ssoVerifyUrl = url.format(urlObj);

  // Build the auth header from recently acquired token:
  var verifyAuthHeaderString = "Bearer " + token;

  // Set up options for the get request:
  var getOptions = {
    url: ssoVerifyUrl,
    headers:{
      "Authorization": verifyAuthHeaderString,
      "User-Agent": MY_USER_AGENT,
    }
  }

  // Send response:
  request.get(getOptions, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      var bodyObj = JSON.parse(body);
      callback(null, response, bodyObj)
    } else {
      callback(err, response);
    }
  })
}

/* 
 *  UTILITY
 */
function base64ify(input){
  // we use this to craft the Authentication header for token request:
  var authHeader = new Buffer(input, 'utf8').toString('base64');
  return authHeader;
}

module.exports.beginSSO = beginSSO;
module.exports.callbackSSO = callbackSSO;