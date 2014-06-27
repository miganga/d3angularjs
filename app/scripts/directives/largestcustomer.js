'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:largestCustomer
 * @description
 * # largestCustomer
 */
angular.module('partnerApp')
    .directive('largestCustomer', function () {
        return {
            template: '<div class="rectchart"><div></div></div>',
            restrict: 'E',
            replace: true,
            scope: {
                rectData: '=',
                changePercentage: '=',
                width: '=',
                height: '='
            },
            controller: function ($scope, organizeFactory) {
                $scope.days = ["Germany", "Australia", "U.S."];
                $scope.daysN = [0, 1, 2];
                $scope.orders = [21, 32, 17];
                $scope.changes = [7, 2, -2];
                $scope.colors = organizeFactory.colorPicker($scope.orders);
                //console.log($scope.colors);
            },
            link: function postLink(scope, element, attrs) {

                /*colors from left to right*/
                var colors = ['009cdf', 'ffffff'];
                /*console.log(scope.daysN);*/

                var x = d3.scale.linear()
                    .domain([0, 7])
                    .range([0, scope.width]);

                var y = d3.scale.linear()
                    .domain([0, 100])
                    .range([0, scope.height - 20]);

                /*console.log(x(2));*/

                /*margin settings*/
                var margin = {top: 0, right: 0, bottom: 0, left: 0},
                    width = scope.width - margin.left - margin.right,
                    height = scope.height - margin.top - margin.bottom;

                var svg = d3.select(element[0].children[0]).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom);

                /*enters the width & height for the rectangles, width is adjusted to the total width of the svg*/
                var rect = svg
                    .append("g")
                    .attr('transform', 'translate(' + 0 + ',' + -50 + ')')
                    .selectAll("rect")
                    .data(scope.days)
                    .enter()
                    .append("rect")
                    .attr("width", width / 10)
                    .attr("height", height - 50)
                    .attr("fill", "#ffffff")
                    .data(scope.daysN)
                    .attr("x", function (d, i) {
                        return x(d) + (i === 0 ? 50 : i * 100 + 50);
                    });

                var secondRect = svg
                    .append("g")
                    .attr('transform', 'translate(' + 0 + ',' + -100 + ')')
                    .selectAll("rect")
                    .data(scope.days)
                    .enter()
                    .append("rect")
                    .attr("width", width / 10)
                    .attr("fill", "#000000")
                    .data(scope.daysN)
                    .attr("x", function (d, i) {
                        return x(d) + (i === 0 ? 50 : i * 100 + 50);
                    })
                    .data(scope.orders)
                    .attr("height", function (d, i) {
                        return y(d);
                    })
                    .attr("y", function (d, i) {
                        return scope.height - y(d);
                    })
                    .data(scope.colors)
                    .attr("fill", function (d) {
                        return d;
                    });

                var textDays = svg
                    .append("g")
                    .attr('transform', 'translate(' + 0 + ',' + (scope.height - 70) + ')')
                    .selectAll("g")
                    .data(scope.days)
                    .enter()
                    .append("text")
                    .attr("text-anchor", "middle")
                    .data(scope.daysN)
                    .attr("x", function (d, i) {
                        return x(d) + width / 20 + (i === 0 ? 50 : i * 100 + 50);
                    })
                    .data(scope.days)
                    .text(function (d) {
                        return d;
                    });

                var textPercentages = svg
                    .append("g")
                    .attr('transform', 'translate(' + -20 + ',' + (scope.height - 45) + ')')
                    .selectAll("g")
                    .data(scope.days)
                    .enter()
                    .append("text")
                    .attr("text-anchor", "middle")
                    .data(scope.daysN)
                    .attr("x", function (d, i) {
                        return x(d) + width / 20 + (i === 0 ? 50 : i * 100 + 50);
                    })
                    .data(scope.orders)
                    .text(function (d) {
                        return d + "%";
                    });

                var textChanges = svg
                    .append("g")
                    .attr('transform', 'translate(' + 20 + ',' + (scope.height - 45) + ')')
                    .selectAll("g")
                    .data(scope.days)
                    .enter()
                    .append("text")
                    .attr("text-anchor", "middle")
                    .data(scope.daysN)
                    .attr("x", function (d, i) {
                        return x(d) + width / 20 + (i === 0 ? 50 : i * 100 + 50);
                    })
                    .data(scope.changes)
                    .text(function (d) {
                        return "(" + (d > 0 ? '+' : '') + d + "%)";
                    })
                    .attr("style", function (d) {
                        return "fill: " + (d > 0 ? '#6dbd58' : '#ff7a78') + ";";
                    });


            }
        };
    });
