'use strict';

angular.module('maximalistApp')
  .controller('SettingsCtrl', function($scope, FileUploader) {
    $scope.uploader = new FileUploader({
      url: '/api/items/import',
      autoUpload: true
    });


  });
