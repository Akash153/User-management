var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var url = require('url');
var http = require('http');
const path = require('path');
var getfield = require('./getfield');

var config = "mongodb://localhost:27017/employees";
mongoose.connect(config)
    .connection
        .on('connected',function(){
            console.log("successfully connected to "+ config)
        })
        .on('error',function(err){
            console.log("database error "+ err)
        })
var app = express();
var port = 3000 ;
app.get('/', function(req, res){
    res.send("Hello from MaheFc...");
});
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    next();
    });
var router = require('./routes');
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/employees', router);

app.get("*", function(req,res){
res.sendFile(srcpath +'/index.html')
})

app.listen(port, function(){
    console.log("server is running on port  "+ port);
})

