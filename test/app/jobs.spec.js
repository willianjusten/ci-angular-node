describe('posting jobs', function() {

    var postRequestJob;
    var newJob = {title: 'Python Developer', description: 'The best python developer from the world is needed.'};

    beforeEach(module('app'));

    it('should call /api/jobs with job data', inject(function($httpBackend, jobs){
        $httpBackend.whenPOST('/api/jobs', function(data) {
            postRequestJob = JSON.parse(data);
            expect(postRequestJob).to.not.be.empty;
            return true;
        }).respond(200);

        jobs.save(newJob);
        $httpBackend.flush();
    }));
});