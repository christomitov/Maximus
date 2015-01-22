'use strict';

angular.module('maximalistApp')
  .controller('InvoicesCtrl', function($scope, $state, $stateParams, Modal, Item, Invoice) {
    // Current item being saved/looked up/edited
    $scope.currentItem = {
      item: ''
    };

    // All invoices
    $scope.invoices = Invoice.query();

    $scope.invoice = {
      items: []
    };

    // Invoice loaded by param
    if ($stateParams.id) {
      $scope.invoice = Invoice.get({
        id: $stateParams.id
      });
    }

    // Item database for autocomplete
    $scope.skuNumbers = [{
      sku: '11111',
      name: 'something'
    }, {
      sku: '22222',
      name: 'something else'
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
      $scope.invoice.items.push($scope.currentItem.item);
    };


    $scope.edit = function(item) {
      $scope.currentItem.item = item;
      console.log('item to edit', item);
      var saveItemModal = Modal.confirm.save(null, null, $scope.currentItem);
      saveItemModal();
    };

    $scope.delete = function(item) {
      _.each($scope.invoice, function(invoiceItem, index) {
        if (invoiceItem.sku === item.sku) {
          $scope.invoice.splice(index, 1);
          return false;
        }
      });
    };

    $scope.deleteInvoice = function(id) {
      var confirmDeleteModal = Modal.confirm.delete(function() {
        Invoice.delete({ id: id });
        $scope.invoices = Invoice.query();
      });

      confirmDeleteModal("this invoice");
    };

    $scope.saveInvoice = function() {
      console.log('saving invoice...', $scope.invoice);
      var invoice = new Invoice($scope.invoice);
      invoice.$save();
    };
  });
