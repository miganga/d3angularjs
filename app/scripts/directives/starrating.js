'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:starRating
 * @description
 * # starRating
 */
angular.module('partnerApp')
    .directive('starRating', function ($window) {
        return {
            templateUrl: 'views/starrating.html',
            restrict: 'E',
            replace: true,
            scope: {
                average: '=',
                changePercentage: '=',
                averageValues: '=',
                width: '=',
                height: '='
            },
            controller: function ($scope, UtilsService) {
                $scope.ratingWidth = (($scope.average / 5 * ($window.innerWidth < 1024 ? 340 : $scope.width)) - 1);
                $scope.sign = UtilsService.checkSign($scope.changePercentage);
            },
            link: function postLink(scope, element, attrs) {
                element.css("width", ($window.innerWidth < 1024 ? 340 : scope.width));
                element.css("height", scope.height);
                element.children('.rating').css("width", scope.ratingWidth);
            }
        };
    });
