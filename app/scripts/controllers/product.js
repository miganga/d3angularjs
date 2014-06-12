'use strict';

/**
 * @ngdoc function
 * @name partnerApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the partnerApp
 */
angular.module('partnerApp')
  .controller('ProductCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
