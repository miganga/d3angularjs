'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:lineComp
 * @description
 * # lineComp
 */
angular.module('partnerApp')
  .directive('lineComp', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the lineComp directive');
      }
    };
  });
