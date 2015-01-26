'use strict';

describe('Directive: googlePlaces', function () {

  // load the directive's module and view
  beforeEach(module('maximalistApp'));
  beforeEach(module('app/googlePlaces/googlePlaces.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<google-places></google-places>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the googlePlaces directive');
  }));
});