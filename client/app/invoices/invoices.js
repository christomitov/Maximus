'use strict';

angular.module('maximalistApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('invoices', {
        templateUrl: 'app/invoices/invoicesIndex.html',
        controller: 'MainCtrl'
      });
  });
