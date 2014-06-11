'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:topHeader
 * @description
 * # topHeader
 */
angular.module('partnerApp')
  .directive('topHeader', function () {
    return {
      templateUrl: 'views/topheader.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {

      }
    };
  });
