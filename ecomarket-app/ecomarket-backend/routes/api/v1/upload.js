var express = require('express');
var router = express.Router();
const multer = require('multer');
const {Storage} = require('@google-cloud/storage');

const uupload = multer({ dest: './temp/user/' });
router.get('/images/user',uupload.single(),function(req,res,next){
    const storage = new Storage();
    const name  = req.file.filename;
    storage.bucket("ecomarket-image-storage").upload('./temp/user/'+name,{
        destination: 'user/'+name,
    });
});

const pupload = multer({ dest: './temp/product/' });
router.get('/images/product',function(req,res,next){
    const storage = new Storage();
    const name  = req.file.filename;
    storage.bucket("ecomarket-image-storage").upload('./temp/product/'+name,{
        destination: 'product/'+name,
    });
});

//exporta funções/"objetos"
module.exports = router ;