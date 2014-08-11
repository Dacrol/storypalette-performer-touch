angular.module('sp.performer', [
  'templates-app',
  'templates-common',
  'templates-shared',

  'sp.performer.start', 
  'sp.performer.palettes',
  'sp.performer.perform',

  'sp.performer.common.config', 

  'uiAuth', 
  'uiSocket', 

  'ui.router',
  'ui.bootstrap'
])

.config(function($locationProvider, authConfigProvider, config) {
  // Route configuration
  $locationProvider.html5Mode(true);  // no hash-urls

  authConfigProvider.setTokenKey('spPerformerToken'); 
  authConfigProvider.setApiBase(config.apiBase); 

  // TODO: Wrong URL
})

.controller('AppCtrl', function($scope) {
  console.log('AppCtrl');
})
;
