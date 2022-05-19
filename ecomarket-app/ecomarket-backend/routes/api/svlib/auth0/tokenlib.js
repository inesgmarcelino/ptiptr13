const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: 'ecomarket.works/api',
  issuerBaseURL: `https://dev-n5fif4kp.eu.auth0.com/`,
});

const authScopes = {"auth":checkJwt,
                    "scopes":{
                        "user":requiredScopes('scope:user'),
                        "provider":requiredScopes('scope:provider'),
                        "carrier":requiredScopes('scope:carrier')
                    }
                };

exports.scopes = authScopes;

/** 
 * https://auth0.com/docs/quickstart/backend/nodejs/02-using
 * https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets
 * https://manage.auth0.com/dashboard/eu/dev-n5fif4kp/apis/627bfefe3d585f003dd2aa85/permissions
 */

/**
// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});


const { requiredScopes } = require('express-oauth2-jwt-bearer');

const checkScopes = requiredScopes('read:messages');

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
});

 */