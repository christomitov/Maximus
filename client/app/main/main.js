'use strict';

angular.module('maximalistApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '',
        abstract: true,
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
