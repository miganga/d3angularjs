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
            template: '<div class="halfpie">' +
                '' +
                '</div>',
            restrict: 'E',
            scope: {
                averageValue: '=',
                maxValue: '=',
                width: '=',
                height: '='
            },
            replace: true,
            link: function postLink(scope, element, attrs) {
                // the D3 bits...
                var color = d3.scale.category10();
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
                var svg = d3.select(element[0]).append('svg')
                    .attr({width: width, height: height})
                    .append('g')
                    .attr('transform', 'translate(' + width / 2 + ',' + (height - 20) + ')');
                // add the <path>s for each arc slice
                svg.selectAll('path').data(pie([scope.averageValue, (scope.maxValue-scope.averageValue)])) // our data
                    .enter().append('path')
                    .style('stroke', 'white')
                    .attr('d', arc)
                    .attr('fill', function (d, i) {
                        return color(i)
                    });
                /*svg.append("svg:text")
                    .text(function(d, i) { return "test"; });*/
            }
        };
    });
