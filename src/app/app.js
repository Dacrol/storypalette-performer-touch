angular.module('sp.performer', [
  'templates-app',
  'templates-common',
  'templates-shared',

  'sp.performer.rooms', 
  'sp.performer.palettes',
  'sp.performer.perform',

  'sp.performer.common.config', 

  'uiAuth', 
  'spUtils',
  'uiProfile',

  'ui.router',
  'ui.bootstrap'
])

.config(function($locationProvider, $urlRouterProvider, authConfigProvider, config, authProvider, $stateProvider) {
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
      user: authProvider.requireUser
    }
  });

  // Redirect to palette list.
  $urlRouterProvider.when('/', '/rooms');


  // TODO: Wrong URL
})

.run(function($rootScope, $state) {
  // Listen for resolve errors.
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.log('stateChangeError', error);  
    $state.go('user.rooms');
    /*
    switch (toState.name) {
      case 'user.perform': 
        // Tried to access performer without selecting a room.
        // Redirect to room select.
        $state.go('user.rooms');
    }
    */
  });
})

.controller('AppCtrl', function($scope, $state, config, utils, auth) {
  // Used to point /image and /sound to the correct api url.
  $scope.apiBase = config.apiBase;

  $scope.$on('auth:userLoggedOut', function(e) {
    console.log('user logged out appctrl');
    $state.go('user.rooms');
  });

  $scope.$on('auth:userLoggedIn', function(e, user) {
    console.log('auth:userLoggedIn', user.username); 

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
