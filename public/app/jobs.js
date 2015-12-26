angular
    .module('app')
    .factory('jobs', ['$resource', function($resource){
        return $resource('/api/jobs/');
}])