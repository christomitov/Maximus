'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('maximalistApp'));

  var MainCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    // $httpBackend = _$httpBackend_;
    // $httpBackend.expectGET('/api/things')
    //   .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });

  }));

  it('should have empty alerts', function () {
    expect(scope.alerts).toEqual([]);
  });
});
