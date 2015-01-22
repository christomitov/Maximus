'use strict';

angular.module('maximalistApp')
  .controller('InvoicesCtrl', function($scope, $state, $stateParams, Modal, Item, Invoice) {
    // Current item being saved/looked up/edited
    $scope.currentItem = {
      item: ''
    };

    // All invoices
    $scope.invoices = Invoice.query();

    // Empty Invoice
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
    $scope.items = Item.query();

    // On SKU autocompleted and selected
    $scope.itemSelected = function(selected) {

      // TODO: Fetch the item from the database via SKU, this is slow.
      $scope.items.forEach(function(item, index) {
        if(item.sku === selected.originalObject.sku) {
          $scope.currentItem.item = item;
        }
      });
      //$scope.currentItem.item = Item.getItem(selected.title);
      console.log('current item is...', $scope.currentItem);
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


    $scope.editItem = function(item) {
      $scope.currentItem.item = item;
      console.log('item to edit', item);
      var saveItemModal = Modal.confirm.save(null, null, $scope.currentItem);
      saveItemModal();
    };

    $scope.deleteItem = function(item) {
      _.each($scope.invoice.items, function(invoiceItem, index) {
        if (invoiceItem.sku === item.sku) {
          $scope.invoice.items.splice(index, 1);
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
