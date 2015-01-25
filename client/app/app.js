'use strict';

angular.module('maximalistApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'angucomplete-alt',
    'angularFileUpload'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .animation('.flash-message', function($timeout) {
    return {
      enter : function(element, done) {
        element.css('opacity',1);
        $timeout(function() {
          jQuery(element).animate({opacity: 0}, 500, function() {
            element.remove();
          });
        },3000);


        // optional onDone or onCancel callback
        // function to handle any post-animation
        // cleanup operations
        return function(isCancelled) {
          if(isCancelled) {
            jQuery(element).stop();
          }
        }
      }
    }
  });
