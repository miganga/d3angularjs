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
                $scope.height = angular.element('.top-products').find('table').height();
            },
            link: function postLink(scope, element, attrs) {
                console.log(scope.height);
                element.parent().css("height", scope.height);
            }
        };
    });
