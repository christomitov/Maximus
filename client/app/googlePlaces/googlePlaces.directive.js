/*global google */
'use strict';

angular.module('maximalistApp')
  .directive('googlePlaces', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level"/>',
      link: function($scope, element) {
        var autocomplete = new google.maps.places.Autocomplete($('#google_places_ac')[0], {});

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var place = autocomplete.getPlace();
          if (place.geometry) {

            var lat = place.geometry.location.lat();
            var lng = place.geometry.location.lng();

            $scope.invoice.locationUrl = 'http://maps.google.com/maps?q=' + lat + ',' + lng + '&ll=' + lat + ',' + lng + '&z=17';
            $scope.invoice.location = place.formatted_address;

            $scope.$apply();
          }
        });
      }
    };
  });
