'use strict';

describe('Service: organizeFactory', function () {

    // load the service's module
    beforeEach(module('partnerApp'));

    // instantiate service
    var organizeFactory;
    var values = [10.3,10.66,10.33,50.99,5.12,10.11,10.2];
    var max_value = _.max(values, function(x) {
        return x;
    });
    var max_value_index = _.reduce(values, function(t,x,y,z) {
        return x == max_value ? y + t : t;
    },0)
    var min_value = _.min(values, function(x) {
        return x;
    });
    var min_value_index = _.reduce(values, function(t,x,y,z) {
        return x == min_value ? y + t : t;
    },0);
    var random_mid_value = _.find(values, function(t,x) {
        if(t !== min_value && t !== max_value) {
            var d = x;
        }
    },0);
    var mid_value_index = _.reduce(values, function(t,x,y,z) {
        return x == random_mid_value ? y + t : t;
    },0);
    console.log(mid_value_index);

    beforeEach(inject(function (_organizeFactory_) {
        organizeFactory = _organizeFactory_;
    }));

    it('should do something', function () {
        expect(!!organizeFactory).toBe(true);
    });

    it('colorPicker method should give #ff7a78 to the lowest values of the given array', function () {
        var data = organizeFactory.colorPicker(values);
        expect(data[min_value_index]).toEqual('#ff7a78');
    });

    it('colorPicker method should give #6ebe59 to the highest values', function () {
        var data = organizeFactory.colorPicker(values);
        expect(data[max_value_index]).toEqual('#6ebe59');
    });

    it('colorPicker method should give #bbb9ba to the values between the highest & the lowest', function () {
        var data = organizeFactory.colorPicker(values);
        expect(data[mid_value_index]).toEqual('#bbb9ba');
    });
});
