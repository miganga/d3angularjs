'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:kpiBanner
 * @description
 * # kpiBanner
 */
angular.module('partnerApp')
    .directive('kpiBanner', function () {
        return {
            templateUrl: 'views/kpibanner.html',
            restrict: 'E',
            scope: {
                totalNumber: '=',
                changePercent: '=',
                changeAmount: '=',
                lineData: '=',
                currencySwitch: '=',
                lineAverage: '='
            },
            replace: true,
            transclude: true,
            link: function postLink(scope, element, attrs) {
                if(scope.changePercent > 0) scope.changePercentage = "+";
                if(scope.currencySwitch == 'on') scope.currencySign = '€';
            }
        };
    });
