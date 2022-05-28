var express = require('express');
var session = require('express-session');
const bodyParser = require("body-parser");
const sqlite = require("better-sqlite3");
const debug = require('debug')('http');

const SqliteStore = require("better-sqlite3-session-store")(session)
const db = new sqlite("sessions.db", { verbose: console.log });

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

app.use(session({
      //secret: process.env.SECRET,
      secret: 'String',
      cookie: {
        //domain: "ecomarket.works",
        expires: (new Date(Date.now() + 3600000)),
        path: '/',
        sameSite: 'lax'
      },
      name: "ecomarksesh",
      resave: false,
      saveUninitialized: false,

      store: new SqliteStore({
        client: db, 
        expired: {
          clear: true,
          intervalMs: 900000 //ms = 15min
        }
      })
}));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res,next){
  console.log(req);
  if(req.session.name){
    res.json({"name":req.session.name});
  } else {
    res.redirect("/setName");
  }
});

app.get("/setName", function(req,res,next){
    req.session.name = "Nome";
    res.redirect("/");
});

/*
app.post("/", function(req,res,next){
    req.body;
})*/

var server = http.createServer(app);
var port = normalizePort(process.env.PORT || '3000');
server.listen(port);

