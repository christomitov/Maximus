'use strict';

angular.module('maximalistApp')
  .controller('InvoicesCtrl', function($scope, Modal, Item) {
    // Current item being saved/looked up/edited
    $scope.currentItem = {
      item: ''
    };

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
      $scope.currentItem.item = Item.getItem(selected.title);
      // Load the modal with this item
      var saveItemModal = Modal.confirm.save(saveItemToInvoice, null, $scope.currentItem);
      // Render the modal
      saveItemModal();
      // Clear the SKU input field
      $scope.$broadcast('angucomplete-alt:clearInput', 'sku');
    };

    var saveItemToInvoice = function() {
      $scope.invoice.push($scope.currentItem.item);
    };


    $scope.edit = function(item) {
      $scope.currentItem.item = item
      console.log('item to edit', item);
      var saveItemModal = Modal.confirm.save(null, null, $scope.currentItem);
      saveItemModal();
    };

    $scope.delete = function(item) {
      _.each($scope.invoice, function(invoiceItem, index) {
        if (invoiceItem.sku == item.sku) {
          $scope.invoice.splice(index, 1);
          return false;
        }
      });
    }
  });
