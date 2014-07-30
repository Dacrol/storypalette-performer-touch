angular.module('sp.performer', [
  'ui.router',

  'templates-app',
  'templates-common',
  'templates-shared',

  'sp.performer.start', 
  'sp.performer.palettes',
  'sp.performer.perform',

  'ui.bootstrap'
])

.config(function($locationProvider) {
  // Route configuration
  $locationProvider.html5Mode(true);  // no hash-urls

  // TODO: Wrong URL
})

.controller('AppCtrl', function($scope) {
  console.log('AppCtrl');
})
;
