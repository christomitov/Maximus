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
        if (item.sku === selected.originalObject.sku) {
          $scope.currentItem.item = item;
        }
      });

      // Load the modal with this item
      var saveItemModal = Modal.confirm.save(saveItemToInvoice, null, $scope.currentItem);
      // Render the modal
      saveItemModal();
      // Clear the SKU input field
      $scope.$broadcast('angucomplete-alt:clearInput', 'sku');
    };

    var saveItemToInvoice = function() {
      switch ($scope.currentItem.item.unit) {
        case 'CUBIC METRE':
          $scope.currentItem.item.priceQty = $scope.currentItem.item.l * $scope.currentItem.item.w * $scope.currentItem.item.h * $scope.currentItem.item.unitPrice;
          break;
        case 'SQUARE METRE':
          $scope.currentItem.item.priceQty = $scope.currentItem.item.l * $scope.currentItem.item.w * $scope.currentItem.item.unitPrice;
          break;
        case 'METRE':
          $scope.currentItem.item.priceQty = $scope.currentItem.item.l * $scope.currentItem.item.unitPrice;
          break;
        case 'EACH':
          $scope.currentItem.item.priceQty = $scope.currentItem.item.quantity * $scope.currentItem.item.unitPrice;
          break;
        case 'HOURLY':
          $scope.currentItem.item.priceQty = $scope.currentItem.item.hourly * $scope.currentItem.item.unitPrice;
          break;
        case 'PERCENTAGE':
          $scope.currentItem.item.priceQty = $scope.currentItem.item.percentage * $scope.currentItem.item.unitPrice;
          break;
        default:
          break;
      }
      $scope.invoice.items.push($scope.currentItem.item);
    };

    $scope.getInvoiceTotal = function() {
      var total = 0;
      //console.log($scope.invoice.items.length);
      if ($scope.invoice.items) {
        for (var i = 0; i < $scope.invoice.items.length; i++) {
          var item = $scope.invoice.items[i];
          total += (item.priceQty);
        }
      }

      return total;
    }

    $scope.editItem = function(item) {
      $scope.currentItem.item = item;
      console.log('item to edit', item);
      var saveItemModal = Modal.confirm.save(null, null, $scope.currentItem);
      saveItemModal();
    };

    $scope.updatePrice = function() {
      console.log($scope.currentItem);
    }

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
        Invoice.delete({
          id: id
        });
        $scope.invoices = Invoice.query();
      });

      confirmDeleteModal("this invoice");
    };

    $scope.saveInvoice = function() {
      console.log('saving invoice...', $scope.invoice);
      if($scope.invoice._id) {
        $scope.invoice.$update();
      } else {
        var invoice = new Invoice($scope.invoice);
        invoice.$save();
      }
    };
  });
