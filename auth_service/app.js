var express = require('express');
var session = require('expression-session');
const bodyParser = require("body-parser");

var http = require('http');

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
}

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.post("/", function(req,res,next){
    req.body;
})

var server = http.createServer(app);
var port = normalizePort(process.env.PORT || '3000');
server.listen(port);

