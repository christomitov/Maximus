'use strict';

angular.module('maximalistApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main.dashboard', {
        url: '/',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      });
  });
