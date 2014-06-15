'use strict';

describe('Service: Kpifactory', function () {

    // load the service's module
    beforeEach(module('partnerApp.services','fakeData'));

    // instantiate service
    var Kpifactory, data, dataBenchmark, monthlyTransactionDataWithBenchmark, httpBackend;
    beforeEach(inject(function (_Kpifactory_, $httpBackend, monthlyJSON, $http) {
        Kpifactory = _Kpifactory_;
        data = [
            {
                "values": [
                    {
                        "value": "2014-01-25T00:00:00.0000+000"
                    },
                    {
                        "value": 1
                    },
                    {
                        "value": 1
                    },
                    {
                        "value": 351.7962
                    }
                ]
            },
            {
                "values": [
                    {
                        "value": "2014-01-26T00:00:00.0000+000"
                    },
                    {
                        "value": 0
                    },
                    {
                        "value": 100
                    },
                    {
                        "value": 1092.5082
                    }
                ]
            }];
        dataBenchmark = [
            {
                "values": [
                    {
                        "value": "2014-01-25T00:00:00.0000+000"
                    },
                    {
                        "value": 1
                    },
                    {
                        "value": 1
                    },
                    {
                        "value": 351.7962
                    }
                ]
            },
            {
                "values": [
                    {
                        "value": "2014-01-26T00:00:00.0000+000"
                    },
                    {
                        "value": 0
                    },
                    {
                        "value": 70
                    },
                    {
                        "value": 1092.5082
                    }
                ]
            }];

        /*fake monthly data with actual and benchmark data including returning values*/
        httpBackend = $httpBackend;
        $httpBackend.whenGET('/data').respond(monthlyJSON);

        $http.get('/data').
            success(function(data, status, headers, config) {
                if (data) {
                    monthlyTransactionDataWithBenchmark = data;
                }
            }).
            error(function(data, status, headers, config) {
                console.error('Error fetching feed:', data);
            });
    }));

    it('exists', function () {
        expect(!!Kpifactory).toBe(true);
    });

    it('arrayConvert method should return [1,100]', function () {
        expect(Kpifactory.arrayConvert(data, 2)).toEqual([1,100]);
    });

    it('totalAmount method should return 101', function () {
        expect(Kpifactory.totalAmount(data, 2)).toBe(101);
    });

    it('differenceAmount method should return 30', function () {
        expect(Kpifactory.differenceAmount(Kpifactory.totalAmount(data, 2),Kpifactory.totalAmount(dataBenchmark, 2))).toBe(30);
    });

    it('differencePercentage method should return 34.88', function () {
        //console.log(Kpifactory.totalAmount(data, 2),Kpifactory.totalAmount(dataBenchmark, 2));
        expect(Kpifactory.differencePercentage(Kpifactory.totalAmount(data, 2),Kpifactory.totalAmount(dataBenchmark, 2))).toBe(34.88);
    });

    it('average method should be equal to 50.5', function () {
        expect(Kpifactory.average(Kpifactory.arrayConvert(data, 2))).toBe(51);
    });

    it('topValue method should return 70', function () {
        expect(Kpifactory.topValue(dataBenchmark, 2)).toBe(70);
    });

    it('totalAmountWithRange method with actual parameter should return the total of 42-55 array index members', function () {
        httpBackend.flush();
        expect(Kpifactory.totalAmountWithRange(monthlyTransactionDataWithBenchmark.data.rows,2,'actual')).toBe(679);
    });

    it('totalAmountWithRange method with last parameter should return the total of 28-41 array index members', function () {
        httpBackend.flush();
        expect(Kpifactory.totalAmountWithRange(monthlyTransactionDataWithBenchmark.data.rows,2,'last')).toBe(887);
    });

    it('totalAmountWithRange method with whole parameter should return the total of all array index members', function () {
        httpBackend.flush();
        expect(Kpifactory.totalAmountWithRange(monthlyTransactionDataWithBenchmark.data.rows,2,'whole')).toBe(3165);
    });

    xit('returningCustomerRate method should return the percentage of total returning customers', function () {
        expect(Kpifactory.returningCustomerRate(data)).toBe(1);
    });

});
