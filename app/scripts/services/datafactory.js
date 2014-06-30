'use strict';

/**
 * @ngdoc service
 * @name partnerApp.dataFactory
 * @description
 * # dataFactory
 * Factory in the partnerApp.
 */
angular.module('partnerApp')
    .factory('dataFactory', function ($resource) {
        var factory = {};

        var resource = $resource(
            'http://10.0.106.156:9000/kpi/v1/retailer/34441/:action',
            {},
            {
                getData: {
                    method: 'GET',
                    params: {
                        action: 'transactions'
                    }
                }
            }
        );

        factory.getData = function (x) {
            return resource.getData({startDate: x.startDate, endDate: x.endDate, currency: x.currency, rollup: x.rollup, includeBenchmark: x.includeBenchmark, sortOrder: x.sortOrder, sortField: x.sortField});
        };
        return factory;
    });
