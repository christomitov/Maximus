'use strict';

angular.module('maximalistApp')
  .controller('InvoicesCtrl', function($scope, Modal) {
    $scope.skuNumbers = [{
      sku: '11111',
      name: 'something'
    }, {
      sku: '22222',
      name: 'something else'
    }];

    $scope.selected = 'hellooo';

    $scope.skuSelected = function(selected) {

      var test = Modal.confirm.save(callback, '<p>hello</p>', $scope);
      //var test = Modal.confirm.delete(callback, '<p>hello</p>');
      test();

      //window.alert('You have selected ' + selected.title);
      $scope.$broadcast('angucomplete-alt:clearInput', 'sku');
    }

    var callback = function() {
      console.log("HERE!");
    }
  });
