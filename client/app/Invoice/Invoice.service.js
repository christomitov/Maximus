'use strict';

angular.module('maximalistApp')
  .factory('Invoice', function ($resource) {
    return $resource('/api/invoices/:id', {id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  });
