'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:rectChart
 * @description
 * # rectChart
 */
angular.module('partnerApp')
  .directive('rectChart', function () {
        return {
            template: '<div class="rectchart"><div></div><div>{{ rectData }}% of your transactions generate reviews</div></div>',
            restrict: 'E',
            replace: true,
            scope: {
                rectData: '=',
                changePercentage: '=',
                width: '=',
                height: '='
            },
            controller: function($scope) {
                $scope.data = [$scope.rectData,(100-$scope.rectData)];

                $scope.xData = [0,$scope.data[0]];
            },
            link: function postLink(scope, element, attrs) {
                /*console.log(scope.data);*/

                /*colors from left to right*/
                var colors = ['009cdf', 'ffffff'];

                /*margin settings*/
                var margin = {top: 0, right: 0, bottom: 0, left: 0},
                    width = scope.width - margin.left - margin.right,
                    height = scope.height - margin.top - margin.bottom;

                var x = d3.scale
                    .linear()
                    .domain([0, d3.sum(scope.data, function (d) {
                        return d;
                    })])
                    .range([0, width]);

                var svg = d3.select(element[0].children[0]).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)

                /*enters the width & height for the rectangles, width is adjusted to the total width of the svg*/
                var rect = svg
                    .selectAll("rect")
                    .data(scope.data)
                    .enter()
                    .append("rect")
                    .attr("width", function (d, i) {
                        return x(d);
                    })
                    .attr("height", height)
                    .data(colors)
                    .attr("style", function (d) {
                        return "fill:" + d;
                    });
                /*enters x coordinates for the rectangles*/
                svg
                    .selectAll("rect")
                    .data(scope.xData)
                    .attr("x", function (d) {
                        return x(d);
                    })
                /*text for the percentage display*/
                svg
                    .append("svg:text")
                    .attr("text-anchor","middle")
                    .attr("class","big")
                    .attr("y", (height*52)/100)
                    .attr("x", x(scope.data[0])/2)
                    .text(scope.data[0] + "%");
                /*text for the change percentage display*/
                svg
                    .append("svg:text")
                    .attr("text-anchor","middle")
                    .attr("class","small")
                    .attr("y", (height*72)/100)
                    .attr("x", x(scope.data[0])/2)
                    .text("(" + scope.changePercentage + "%)");
            }
        };
  });
