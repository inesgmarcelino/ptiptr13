var express = require('express');
var router = express.Router();
const parser = require('../svlib/validator/parser');
const ServerError = require('../svlib/ServError/ServerError');
const pool = require('../svlib/db/getPool');

router.get('/:uid/cart', async (req,res,next) => {

});

router.post('/:uid/cart', async (req,res,next)=>{

})

router.post('/order', async (req,res,next) => {



});

module.exports = router ;