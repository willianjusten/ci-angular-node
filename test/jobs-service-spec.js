var expect = require('chai').expect;
var express = require('express');
var app = express();
var request = require('supertest');
var Promise = require('bluebird');

var dataSavedJob;

var db = {
    findJobs: function(){
        return new Promise( function(resolve, reject) {
            resolve(["hi"]);
        })
    },
    saveJob: function(job) {
        dataSavedJob = job;
    }
};

var jobService = require('../jobs-service')(db, app);


describe('get jobs', function() {
    it('should give me a json list of jobs', function(done){
       request(app).get('/api/jobs')
           .expect('Content-type', '/json/')
           .end(function(req, res) {
               expect(res.body).to.be.a('Array');
               done();
           })
    });
});

describe('save jobs', function() {

    var newJob = {title: 'Python Developer', description: 'The best python developer from the world is needed.'};

    it('should validate that title is greater than 4 characters', function(done){
        request(app).post('/api/jobs').send(newJob).end(function(err, res) {
            expect(dataSavedJob.title.length).to.be.above(4);
            done();
        })
    });
    it('should validate that title is less than 40 characters', function(done) {
        request(app).post('/api/jobs').send(newJob).end(function(err, res) {
            expect(dataSavedJob.title.length).to.be.below(40);
            done();
        })
    });

    it('should validate that descriptions is greater than 4 characters', function(done) {
        request(app).post('/api/jobs').send(newJob).end(function(err, res) {
            expect(dataSavedJob.description.length).to.be.above(4);
            done();
        })
    });

    it('should validate that descriptions is less than 250 characters', function(done){
        request(app).post('/api/jobs').send(newJob).end(function(err, res) {
            expect(dataSavedJob.title.length).to.be.below(250);
            done();
        })
    });

    it('should pass the job to the database save', function(done) {
        request(app).post('/api/jobs').send(newJob).end(function(err, res) {
            expect(dataSavedJob).to.deep.equal(newJob);
            done();
        })
    });

    it('should return a status of 200 to the front end if the database saved');
    it('should return a job with an id');
    it('should return an error if the database failed');
});