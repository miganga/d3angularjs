'use strict';

xdescribe('Directive: rectanglePie', function () {

  // load the directive's module
  beforeEach(module('partnerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rectangle-pie></rectangle-pie>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rectanglePie directive');
  }));
});
