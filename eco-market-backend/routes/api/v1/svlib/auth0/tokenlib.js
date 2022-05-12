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

