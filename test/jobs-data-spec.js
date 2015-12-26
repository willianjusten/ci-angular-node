var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobModel = require('../models/Job.js');
var Promise = require('bluebird');

var mongoAddress = 'mongodb://localhost/ci-angular-node';

function resetJobs() {
    return new Promise( function(resolve ,reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

var connectDB = Promise.promisify(mongoose.connect, {context: mongoose});

function findJobs(query) {
    return Promise.cast(mongoose.model('Job').find(query).exec());
}

describe('get jobs', function() {
    it('should never be empty, since jobs are seeded', function(done) {
        connectDB(mongoAddress)
            .then(resetJobs)
            .then(jobModel.seedJobs)
            .then(findJobs)
            .then(function(jobsList) {
                    expect(jobsList.length).to.be.at.least(1);
                    done();
                });
            });
});