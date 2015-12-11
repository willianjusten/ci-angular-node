(function () {
    'use strict';

    angular.module('app', []);

    angular
        .module('app')
        .controller('myCtrl', sayHello);

    function sayHello() {
        this.hello = 'Hello World';
    }
})(); 