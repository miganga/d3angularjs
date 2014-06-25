'use strict';

/**
 * @ngdoc directive
 * @name partnerApp.directive:fullPie
 * @description
 * # fullPie
 */
angular.module('partnerApp')
  .directive('fullPie', function () {
        return {
            templateUrl: 'views/fullpie.html',
            restrict: 'E',
            scope: {
                firstValue: '=',
                secondValue: '=',
                firstName: '=',
                secondName: '=',
                width: '=',
                height: '='
            },
            replace: true,
            link: function postLink(scope, element, attrs) {
                if(scope.changePercentage > 0) scope.percentageSign = "+";
                if(scope.currencySwitch == 'on') scope.currencySign = '€';


                // the D3 bits...
                var color = ["#ffffff","#009cdf"];
                var width = scope.width;
                var height = scope.height;
                var pi = Math.PI;
                var pie = d3.layout.pie()
                    .sort(null)
                    .startAngle(-20 * (pi / 180))
                    .endAngle(340 * (pi / 180));
                var arc = d3.svg.arc()
                    .outerRadius(width / 2 * 0.9)
                    .innerRadius(0);
                var svg = d3.select(element[0].children[1]).append('svg')
                    .attr({width: width, height: height})
                    .append('g')
                    .attr('transform', 'translate(' + width / 2 + ',' + (height-60) + ')');
                // add the <path>s for each arc slice
                svg.selectAll('path').data(pie([scope.firstValue, (scope.secondValue)])) // our data
                    .enter().append('path')
                    .style('stroke', 'white')
                    .attr('d', arc)
                    .data(color)
                    .attr('fill', function (d, i) {
                        return d
                    });
                /*svg.append("svg:text")
                 .text(function(d, i) { return "test"; });*/
            }
        };
  });
