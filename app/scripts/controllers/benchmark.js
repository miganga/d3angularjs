'use strict';

/**
 * @ngdoc function
 * @name partnerApp.controller:BenchmarkCtrl
 * @description
 * # BenchmarkCtrl
 * Controller of the partnerApp
 */
angular.module('partnerApp')
  .controller('BenchmarkCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
