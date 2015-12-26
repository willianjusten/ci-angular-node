var expect = require('chai').expect;
var mongoose = require('mongoose');
var Promise = require('bluebird');
var jobsData = require('../../jobs-data');

var mongoAddress = 'mongodb://localhost/ci-angular-node';

function resetJobs() {
    return new Promise( function(resolve ,reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

describe('get jobs', function() {

    var jobs;

    before(function(done) {
        jobsData.connectDB(mongoAddress)
            .then(resetJobs)
            .then(jobsData.seedJobs)
            .then(jobsData.findJobs)
            .then(function(collection) {
                jobs = collection;
                done();
            });
    });


    it('should never be empty, since jobs are seeded', function() {
        expect(jobs.length).to.be.at.least(1);
    });

    it('should have a job with a title', function() {
        expect(jobs[0].title).to.not.be.empty;
    });

    it('should have a job with a description', function() {
        expect(jobs[0].description).to.not.be.empty;
    });
});