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
  'uiUtils',

  'ui.router',
  'ui.bootstrap'
])

.config(function($locationProvider, $urlRouterProvider, authConfigProvider, config, authProvider, $stateProvider, socketProvider) {
  // Route configuration
  $locationProvider.html5Mode(true);  // no hash-urls

  // Configure modules.
  authConfigProvider.setTokenKey('spPerformerToken'); 
  authConfigProvider.setApiBase(config.apiBase); 

  // Abstract state for different access levels
  $stateProvider.state('user', {
    abstract: true,
    template: '<ui-view/>',
    resolve: {
      user: authProvider.requireUser,
      socketInfo: function(user, socket, utils, auth) {
        var ns = utils.getSocketNamespace(user);
        var room = utils.getSocketRoom(user);
        var token = auth.getToken(); 
        return socketProvider.requireAuthenticatedConnection(socket, ns, room, token);
      }
    }
  });

  // Redirect to palette list.
  $urlRouterProvider.when('/', '/start');

  // TODO: Wrong URL
})

.controller('AppCtrl', function($scope, config, socket, utils, auth) {
  console.log('AppCtrl');

  // Used to point /image and /sound to the correct api url.
  $scope.apiBase = config.apiBase;

  $scope.$on('auth:userLoggedIn', function(e, user) {
    console.log('auth:userLoggedIn', user); 

    /* User logged in, connect to server...
    var ns = utils.getSocketNamespace(user);
    var room = utils.getSocketRoom(user);
    var token = auth.getToken(); 
    socket.connect(ns, room, token).then(function(info) {
      console.log('AppCtrl connected!', info) ;
    });
    */
  });
})
;

// TODO: Temp fix for karma.
window.env = window.env || {};
