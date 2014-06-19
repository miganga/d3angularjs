'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:starRating
 * @description
 * # starRating
 */
angular.module('partnerApp')
    .directive('starRating', function () {
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
            controller: function($scope) {
                $scope.ratingWidth = (($scope.average/5*$scope.width)-1);
            },
            link: function postLink(scope, element, attrs) {
               element.css("width",scope.width);
               element.css("height",scope.height);
               element.children('.rating').css("width",scope.ratingWidth);
               console.log(scope.ratingWidth);
            }
        };
    });
