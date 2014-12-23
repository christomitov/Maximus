'use strict';

angular.module('maximalistApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main.invoices', {
        url: '/invoices',
        templateUrl: 'app/invoices/invoicesIndex.html',
        controller: 'MainCtrl'
      });
  });
