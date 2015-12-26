var expect = require('chai').expect;
var express = require('express');
var app = express();
var request = require('supertest');

var dataSavedJob;

var db = {
    saveJob: function(job) {
        dataSavedJob = job;
    }
};

var jobService = require('../jobs-service')(db, app);

describe('save jobs', function() {

    it('should validate that title is greater than 4 characters');
    it('should validate that title is less than 40 characters');
    it('should validate that descriptions is greater than 4 characters');
    it('should validate that descriptions is less than 250 characters');

    var newJob = {title: 'Python Developer', description: 'The best python developer from the world is needed.'};

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