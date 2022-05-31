var express = require('express');
var http = require('http');
var axios = require('axios');



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

app.get('/',function(req,res,next){
    console.log("requestObject: "+toString(req));
    //axios.post('localhost:3000');
});

var server = http.createServer(app);
var port = normalizePort(process.env.PORT || '4000');
server.listen(port);
