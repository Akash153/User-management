var http = require('http');
var url = require('url');
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var url1 = 'mongodb://localhost:27017/employees';
var cors = require('cors');
var app=express();
app.use(bodyparser.urlencoded({extended: true}));

mongoose.connect(url1)
mongoose.connection.on('connected',()=>{
    console.log('Connected to database mongodb @ 27017');  
  })

http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    

if (req.url === '/favicon.ico') {
  res.writeHead(200, {'Content-Type': 'image/x-icon'} );
  res.end();
  console.log('favicon requested');
  return;
}else{

    var q= url.parse(req.url, true).query;
    var nameStr= q.name;
    var positionStr= q.position;
    var outcome;
    var query = {};
    var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

    if ( typeof nameStr !== 'undefined' && nameStr ){
      query["name"] = nameStr;
    }
    if ( typeof positionStr !== 'undefined' && positionStr ){
      query["position"] = positionStr;
    }
   
    res.writeHead(200, {'Content-Type': 'text/html'});
    
  MongoClient.connect(url1, function(err, db) {
  db.collection("employees").find(query).toArray(function(err, result) {
   console.log("name:" + nameStr +"|"+ "position:" + positionStr);
    if (err) throw err;
    outcome = result
    console.log(outcome);
    db.close();
    res.end(JSON.stringify(outcome));
    
  });
});
}

}).listen(3000);

