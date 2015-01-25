'use strict';

angular.module('maximalistApp')
  .controller('InvoicesCtrl', function($scope, $state, $stateParams, Modal, Item, Invoice, FileUploader) {
      var uploader = $scope.uploader = new FileUploader({
        url: '/api/invoices/upload/'
      });

      // Current item being saved/looked up/edited
      $scope.currentItem = {
        item: ''
      };

      // Empty Invoice
      $scope.invoice = {
        items: []
      };

      // TODO: maybe use a promise, have empty Invoice than populate

      // All invoices
      $scope.invoices = Invoice.query();

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
        $scope.items.forEach(function(item) {
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
      };

      $scope.editItem = function(item) {
        $scope.currentItem.item = item;
        var saveItemModal = Modal.confirm.save(null, null, $scope.currentItem);
        saveItemModal();
      };

      $scope.deleteItem = function(index) {
        $scope.invoice.items.splice(index, 1);
      };

      $scope.deleteInvoice = function(id, index) {
        var confirmDeleteModal = Modal.confirm.delete(function() {
          Invoice.delete({
            id: id
          });

          $scope.invoices.splice(index, 1);

        });

        confirmDeleteModal('this invoice');
      };

      $scope.saveInvoice = function() {
        if ($scope.invoice._id) {
          appendIdAndUpload($scope.invoice._id, uploader);
          $scope.invoice.$update();
        } else {
          var invoice = new Invoice($scope.invoice);
          invoice.$save(function() {
            appendIdAndUpload(invoice._id, uploader);
          });
        }

        $scope.addAlert('success', 'Invoice Saved Successfully');

    };

    var appendIdAndUpload = function(id, uploader) {
      uploader.queue.forEach(function(file) {
        file.url += id;
      });

      // Upload after
      uploader.uploadAll();
    };
  });
