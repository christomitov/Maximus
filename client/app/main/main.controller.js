'use strict';

angular.module('maximalistApp')
  .controller('MainCtrl', function ($scope) {

    $scope.alerts = [];

    $scope.addAlert = function(type, message) {
      $scope.alerts.push({type: type, msg: message});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

  });
