'use strict';

/**
 * @ngdoc function
 * @name partnerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the partnerApp
 */
angular.module('partnerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
