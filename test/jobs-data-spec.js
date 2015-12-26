var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobModel = require('../models/Job.js');
var mongoAddress = 'mongodb://localhost/ci-angular-node';

function resetJobs(callback) {
    mongoose.connection.collections['jobs'].drop(callback);
}

describe('get jobs', function() {
    it('should never be empty, since jobs are seeded', function(done) {
        mongoose.connect(mongoAddress, function() {
            resetJobs(function(){
                jobModel.seedJobs(function(){
                    mongoose.model('Job').find({}).exec(function(err, jobsList) {
                        expect(jobsList.length).to.be.at.least(1);
                        done();
                    });
                });
            });
        });
    });
});