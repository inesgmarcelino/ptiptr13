const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: 'jUk6WveQR9Rc987FBZSBoQY1pQ4a7qfn',
    issuerBaseURL: `https://ecomarket.works/`,
  });

const authScopes = {"auth":checkJwt,
                    "scopes":{
                        "user":requiredScopes('scope:user'),
                        "provider":requiredScopes('scope:provider'),
                        "carrier":requiredScopes('scope:carrier')
                    }
                };

exports.scopes = authScopes;

/** Example
 * app.get('/api/private-scoped', authScopes.auth, authScopes.scopes.user , function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of 'scope:user' to see this.'
  });
});
 * https://auth0.com/docs/quickstart/backend/nodejs/02-using
 * https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets
 * https://manage.auth0.com/dashboard/eu/dev-n5fif4kp/apis/627bfefe3d585f003dd2aa85/permissions
 * 
 */

