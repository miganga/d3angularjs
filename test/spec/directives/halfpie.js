'use strict';

describe('Directive: halfPie', function () {

  // load the directive's module
  beforeEach(module('partnerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<half-pie></half-pie>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the halfPie directive');
  }));
});
