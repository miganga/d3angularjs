'use strict';

describe('Service: UtilsService', function () {

    // load the service's module
    beforeEach(module('partnerApp'));

    // instantiate service
    var UtilsService;
    beforeEach(inject(function (_UtilsService_) {
        UtilsService = _UtilsService_;
    }));

    it('should exist', function () {
        expect(!!UtilsService).toBe(true);
    });

    it('checkSign method should return true for positive numbers', function () {
        expect(UtilsService.checkSign(1)).toBe(true);
    });

    it('checkSign method should return false for negative numbers', function () {
        expect(UtilsService.checkSign(-1)).toBe(false);
    });

    it('checkSign method should work also for string numbers', function () {
        expect(UtilsService.checkSign('-1')).toBe(false);
    });

    it('checkSign method should work also for string numbers', function () {
        expect(UtilsService.checkSign('1')).toBe(true);
    });
});
