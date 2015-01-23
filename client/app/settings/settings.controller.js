'use strict';

angular.module('maximalistApp')
  .controller('SettingsCtrl', function($scope, FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
      url: '/api/items/import'
    });
  });
