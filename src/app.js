import angular from 'angular';
import rooms from './rooms/rooms.js';
import palettes from './palettes/palettes.js';
import perform from './perform/index.js';
import performerConfig from './common/config.js';
import uirouter from 'angular-ui-router';
import uiAuth from './common/uiAuth/index.js';
import uiProfile from './common/uiProfile/uiProfile.js'
import spUtils from './common/spUtils/utils.js';
import uiBootstrap from 'angular-ui-bootstrap';
import './less/main.less';

angular.module('sp.performer', [
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
.config(routing)
.run(run)
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

routing.$inject = ['$urlRouterProvider', '$locationProvider', 'authConfigProvider', 'config', 'authProvider', '$stateProvider'];

function routing($urlRouterProvider, $locationProvider, authConfigProvider, config, authProvider, $stateProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

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
  
  $urlRouterProvider.when('/', '/rooms');
}

run.$inject = ['$rootScope', '$state', '$window'];

function run($rootScope, $state, $window) {
   
  $rootScope.$on('auth:userLoggedOut', function(user){
     $window.location.reload();
  });
  
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
}

window.env = window.env || {};
