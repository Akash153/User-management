var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var url = require('url');
var http = require('http');
const path = require('path');


var url1 = "mongodb://localhost:27017/employees";
mongoose.connect(url1)
    .connection
        .on('connected',function(){
            console.log("successfully connected to "+ url1)
        })
        .on('error',function(err){
            console.log("database error "+ err)
        })
var app = express();
var port = 5000 ;
app.use(bodyParser.urlencoded({extended: true}));

app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    next();
    });

app.get('/', function(req, res){
    
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
});

var router = require('./routes');
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/employees', router);



app.listen(port, function(){
    console.log("server is running on port  "+ port);
})

