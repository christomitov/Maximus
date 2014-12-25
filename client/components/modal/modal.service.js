'use strict';

angular.module('maximalistApp')
  .factory('Modal', function($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass, template) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: template || 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {
        /**
         * Create a function to open a save confirmation modal
         * @param {Function} callback - callback, ran when save is confirmed
         * @return {Function}     - the function to open the modal (ex. myFodalFn)
         */
        save: function(callback, html, item) {
          callback = callback || angular.noop;

          /**
           * Open a save confirmation modal
           * @param {String} name  - name or info to show on modal
           * @param {All}          - any additional args passed straight to save callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
              name = args.shift(),
              saveModal;

            var modalScope = {
              modal: {
                dismissable: true,
                title: 'Add SKU',
                html: html,
                buttons: [{
                  classes: 'btn-primary',
                  text: 'Save',
                  click: function(e) {
                    saveModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    saveModal.dismiss(e);
                  }
                }]
              }
            };

            angular.extend(modalScope, item);
            saveModal = openModal(modalScope, null, 'components/modal/save-modal.html');

            saveModal.result.then(function(event) {
              callback.apply(event, args);
            });
          }
        },

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
              name = args.shift(),
              deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  });
