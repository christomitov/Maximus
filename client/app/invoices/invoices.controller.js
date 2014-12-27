'use strict';

angular.module('maximalistApp')
  .controller('InvoicesCtrl', function($scope, Modal, Item) {

    // Item database for autocomplete
    $scope.skuNumbers = [{
      sku: '11111',
      name: 'something'
    }, {
      sku: '22222',
      name: 'something else'
    }];

    // Current invoice state
    $scope.invoice = [{
      plan: 3,
      arb: 1,
      sku: 344443
    }, {
      plan: 4,
      arb: 3,
      sku: 112030
    }];

    // On SKU autocompleted and selected
    $scope.skuSelected = function(selected) {
      // Fetch the item from the database via SKU
      $scope.currentItem = {
        item: Item.getItem(selected.title)
      };
      // Load the modal with this item
      var saveItemModal = Modal.confirm.save(saveItemToInvoice, null, $scope.currentItem);
      // Render the modal
      saveItemModal();
      // Clear the SKU input field
      $scope.$broadcast('angucomplete-alt:clearInput', 'sku');
    }

    var saveItemToInvoice = function() {
      console.error('HERE', $scope.currentItem.item);
      $scope.invoice.push($scope.currentItem.item);
    }
  });
