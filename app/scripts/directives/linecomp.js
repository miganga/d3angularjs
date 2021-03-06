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
                barData: '=',
                firstData: '=',
                secondData: '=',
                firstPercentage: '=',
                secondPercentage: '='
            },
            transclude: true,
            controller: function ($scope, UtilsService) {
                $scope.firstSign = UtilsService.checkSign($scope.firstPercentage);
                $scope.secondSign = UtilsService.checkSign($scope.secondPercentage);
            },
            link: function postLink(scope, element, attrs) {
                var data = [scope.firstData, scope.secondData];
                var dataPercentage = [scope.firstPercentage, scope.secondPercentage];


                if (scope.firstPercentage > 0) scope.firstPercent = "+";
                if (scope.secondPercentage > 0) scope.secondPercent = "+";


                var m = [0, 0, 0, 0];
                var barWidth = (scope.width - m[1] - m[3]) / 2.5,
                    barHeight = scope.height - 40;

                var y = d3.scale.linear()
                    .domain([0, d3.max(data)])
                    .range([0, barHeight]);

                var chart = d3.select(element[0].children[0])
                    .attr("width", scope.width)
                    .attr("height", scope.height);

                var bar = chart
                    /*.append("g")
                     .attr("transform", function(d, i) { return "translate(" + i * barHeight + ", 0)"; })*/
                    .selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", function (d, i) {
                        return i * barWidth + (i === 1 ? (m[1] + m[3]) + scope.width * 0.2 : 0);
                    })
                    .attr("width", barWidth)
                    .attr("y", function (d) {
                        return Math.round(barHeight - y(d) + 40);
                    })
                    .attr("height", function (d) {
                        return y(d);
                    });

                chart
                    .selectAll("text")
                    .data(data)
                    .enter()
                    .append("text")
                    .text(function (d) {
                        return d;
                    })
                    .attr("x", function (d, i) {
                        return i * barWidth + barWidth / 2 + (i === 1 ? (m[1] + m[3]) + scope.width * 0.2 : 0);
                    })
                    .attr("dx", 0)
                    .attr("dy", 0)
                    .attr("y", function (d) {
                        return Math.round(barHeight - y(d) + 30);
                    })
                    .attr("text-anchor", "middle");

            }
        };
    });
