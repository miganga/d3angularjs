'use strict';

describe('Directive: kpiBanner', function () {

  // load the directive's module
  beforeEach(module('partnerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<kpi-banner></kpi-banner>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the kpiBanner directive');
  }));
});
