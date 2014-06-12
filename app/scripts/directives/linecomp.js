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
            templateUrl: 'views/linecomp.html',
            restrict: 'E',
            replace: true,
            scope: {
                width: '=',
                height: '=',
                cssClass: '=',
                barData: '='
            },
            transclude: true,
            link: function postLink(scope, element, attrs) {
                var margin = {top: 0, right: 0, bottom: 0, left: 0},
                    width = scope.width - margin.left - margin.right,
                    height = scope.height - margin.top - margin.bottom;

                var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .1);

                var y = d3.scale.linear()
                    .range([height, 0]);

                var svg = d3.select(element[0]).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                var data = [{letter: "A", frequency: scope.barData}];


                    x.domain(data.map(function (d) {
                        return d.letter;
                    }));
                    y.domain([0, d3.max(data, function (d) {
                        return d.frequency;
                    })]);

                    svg.selectAll(".bar")
                        .data(data)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function (d) {
                            return x(d.letter);
                        })
                        .attr("width", x.rangeBand())
                        .attr("y", function (d) {
                            return y(d.frequency);
                        })
                        .attr("height", function (d) {
                            return height - y(d.frequency);
                        });


                function type(d) {
                    d.frequency = +d.frequency;
                    return d;
                }
            }
        };
    });
