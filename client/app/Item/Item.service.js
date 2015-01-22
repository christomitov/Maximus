'use strict';

angular.module('maximalistApp')
  .factory('Item', function ($resource) {
    return $resource('/api/items/:id');
  });
