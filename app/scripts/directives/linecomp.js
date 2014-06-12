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
            template: '<div><svg class="bar-chart"></svg></div>',
            restrict: 'E',
            replace: true,
            link: function postLink(scope, element, attrs) {
                var margin = {top: 20, right: 20, bottom: 30, left: 40},
                    width = 200 - margin.left - margin.right,
                    height = 200 - margin.top - margin.bottom;

                var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .1);

                var y = d3.scale.linear()
                    .range([height, 0]);

                /*var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(10, "%");*/

                var svg = d3.select(element[0]).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                d3.tsv("data/data.tsv", type, function(error, data) {
                    x.domain(data.map(function(d) { return d.letter; }));
                    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

                    /*svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);

                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text("Frequency");*/

                    svg.selectAll(".bar")
                        .data(data)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d) { return x(d.letter); })
                        .attr("width", x.rangeBand())
                        .attr("y", function(d) { return y(d.frequency); })
                        .attr("height", function(d) { return height - y(d.frequency); });

                });

                function type(d) {
                    d.frequency = +d.frequency;
                    return d;
                }
            }
        };
    });
