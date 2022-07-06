var express = require('express');
var router = express.Router();
const parser = require('../svlib/validator/parser');
const ServerError = require('../svlib/ServError/ServerError');
const pool = require('../svlib/db/getPool');

router.post('/:tid/vehicles/register', async (req,res,next) => {

});

router.get('/:tid/vehicles', async (req,res,next) => {

});

router.get(':/tid/vehicles/:vid', async (req,res,next) => {

});

module.exports = router ;