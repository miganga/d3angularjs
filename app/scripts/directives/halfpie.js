'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:halfPie
 * @description
 * # halfPie
 */
angular.module('partnerApp')
    .directive('halfPie', function () {
        return {
            templateUrl: 'views/halfpie.html',
            restrict: 'E',
            scope: {
                averageValue: '=',
                maxValue: '=',
                minValue: '=',
                changePercentage: '=',
                currencySwitch: '=',
                width: '=',
                height: '='
            },
            controller: function($scope) {
                if($scope.changePercentage > 0) {
                    $scope.percentageSign = "+";
                    $scope.isPositive = true;
                }
                else {
                    $scope.isPositive = negative;
                }
                if($scope.currencySwitch == 'on') $scope.currencySign = '€';
            },
            replace: true,
            link: function postLink(scope, element, attrs) {
                // the D3 bits...
                var color = ["#009cdf","#ffffff"];
                var width = scope.width;
                var height = scope.height;
                var pi = Math.PI;
                var pie = d3.layout.pie()
                    .sort(null)
                    .startAngle(-90 * (pi / 180))
                    .endAngle(90 * (pi / 180));
                var arc = d3.svg.arc()
                    .outerRadius(width / 2 * 0.9)
                    .innerRadius(width / 2 * 0.5);
                var svg = d3.select(element[0].children[1]).append('svg')
                    .attr({width: width, height: height})
                    .append('g')
                    .attr('transform', 'translate(' + width / 2 + ',' + (height - 20) + ')');
                // add the <path>s for each arc slice
                svg.selectAll('path').data(pie([scope.averageValue, (scope.maxValue-scope.averageValue)])) // our data
                    .enter().append('path')
                    .style('stroke', 'white')
                    .attr('d', arc)
                    .data(color)
                    .attr('fill', function (d, i) {
                        return d;
                    });
                /*svg.append("svg:text")
                    .text(function(d, i) { return "test"; });*/
            }
        };
    });
