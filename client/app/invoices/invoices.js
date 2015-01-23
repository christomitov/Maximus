'use strict';

angular.module('maximalistApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main.invoices', {
        url: '/invoices',
        templateUrl: 'app/invoices/invoicesIndex.html',
        controller: 'InvoicesCtrl'
      })
      .state('main.createInvoice', {
        url: '/invoices/new',
        templateUrl: 'app/invoices/invoicesCreate.html',
        controller: 'InvoicesCtrl'
      })
      .state('main.editInvoice', {
        url: '/invoices/edit/:id',
        templateUrl: 'app/invoices/invoicesCreate.html',
        controller: 'InvoicesCtrl'
      })
      .state('main.uploadDocuments', {
        url: '/invoices/upload',
        templateUrl: 'app/invoices/invoicesUpload.html',
        controller: 'InvoicesCtrl'
      });
  });
