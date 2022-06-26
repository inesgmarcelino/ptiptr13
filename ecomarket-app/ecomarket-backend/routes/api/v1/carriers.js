var express = require('express');
var router = express.Router();
var pool = require('../svlib/db/connection');


/** auth0 */
var auth = require('../svlib/auth0/tokenlib');
const { query } = require('../svlib/db/getPool');
const { response } = require('express');


//exporta funções/"objetos"
module.exports = router ;