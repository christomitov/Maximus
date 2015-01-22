'use strict';

angular.module('maximalistApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main.settings', {
        url: '/settings',
        templateUrl: 'app/settings/settings.html',
        controller: 'SettingsCtrl'
      });
  });
