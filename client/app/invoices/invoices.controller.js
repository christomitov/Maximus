'use strict';

angular.module('maximalistApp')
  .controller('InvoicesCtrl', function($scope, Modal, Item) {
    
    $scope.skuNumbers = [{
      sku: '11111',
      name: 'something'
    }, {
      sku: '22222',
      name: 'something else'
    }];

    $scope.selected = 'hellooo';

    $scope.skuSelected = function(selected) {
      // Fetch the item from the database via SKU
      var item = Item.getItem(selected.title);
      console.log(item);

      // Load the modal with this item
      var saveItemModal = Modal.confirm.save(saveItemToInvoice, null, item);
      // Render the modal
      saveItemModal();
      // Clear the SKU input field
      $scope.$broadcast('angucomplete-alt:clearInput', 'sku');
    }

    var saveItemToInvoice = function() {
      console.log("HERE!");
    }
  });
