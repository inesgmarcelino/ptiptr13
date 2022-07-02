var express = require('express');
var router = express.Router();
var pool = require('../svlib/db/getPool');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
//const { query } = 
const { response } = require('express');


//exporta funções/"objetos"
module.exports = router ;