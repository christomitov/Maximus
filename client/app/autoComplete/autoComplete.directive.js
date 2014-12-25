'use strict';

angular.module('maximalistApp')
  .directive('autoComplete', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.autocomplete({
          source: scope[attrs.uiItems],
          select: function() {
            $timeout(function() {
              element.trigger('input');
            }, 0);
          }
        });
      }
    };
  });
