const request = require('supertest');
const express = require('express');
const app = express();
var expect = require('chai').expect
var should = require("should");
var chai = require('chai');

var server = request.agent("http://localhost:3000/api/employees");


app.get('/employees', function(req, res) {
    res.status(200).json({ name: 'mahesh' });
    });
    
    request(app)
    .get('/employees')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '17')
    .expect(200)
    .end(function(err, res) {
     if (err) throw err;
    });
    
    
    describe('GET /employees', function() {
    it('respond with json', function(done) {
      request(app)
        .get('/employees')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    });
    
    describe('GET /employees', function() {
    it('employees.name should be an case-insensitive match for "mahesh"', function(done) {
      request(app)
        .get('/employees')
        .set('Accept', 'application/json')
        .expect(function(res) {
          res.body.id = 'some fixed id';
          res.body.name = res.body.name.toUpperCase();
        })
        .expect(200, {
          id: 'some fixed id',
      name: 'MAHESH'
    }, done);
    });
    });

    
    
  