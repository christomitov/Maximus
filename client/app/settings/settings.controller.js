'use strict';

angular.module('maximalistApp')
  .controller('SettingsCtrl', function($scope, FileUploader) {
    $scope.message = 'Hello';
    var uploader = $scope.uploader = new FileUploader({
      url: '/api/items/import'
    });
  });
