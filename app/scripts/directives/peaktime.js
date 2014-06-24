'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:peakTime
 * @description
 * # peakTime
 */
angular.module('partnerApp')
    .directive('peakTime', function () {
        return {
            templateUrl: 'views/peaktime.html',
            restrict: 'E',
            replace: true,
            controller: function ($scope) {

            },
            link: function postLink(scope, element, attrs) {

            }
        };
    });
