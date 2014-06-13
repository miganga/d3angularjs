'use strict';

describe('Service: Kpifactory', function () {

    // load the service's module
    beforeEach(module('partnerApp.services'));

    // instantiate service
    var Kpifactory, data, dataBenchmark;
    beforeEach(inject(function (_Kpifactory_) {
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

    it('differencePercentage method should return ', function () {
        //console.log(Kpifactory.totalAmount(data, 2),Kpifactory.totalAmount(dataBenchmark, 2));
        expect(Kpifactory.differencePercentage(Kpifactory.totalAmount(data, 2),Kpifactory.totalAmount(dataBenchmark, 2))).toBe(34.88);
    });

    it('average method should be equal to ', function () {
        expect(Kpifactory.average(Kpifactory.arrayConvert(data, 2))).toBe(50.5);
    });

});
