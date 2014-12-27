'use strict';

angular.module('maximalistApp')
  .factory('Item', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },

      getItem: function(sku) {
        console.log(sku);
        // Dummy object for now
        var item = {
          sku: sku,
          unit: 'PERCENT',
          arb: '',
          plan: ''
        }

        return item;
      }
    };
  });
