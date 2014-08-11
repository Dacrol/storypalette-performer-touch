angular.module('sp.performer.start', [
  'uiAuth', 
  'uiSocket',

  'ui.router'
])

.config(function($stateProvider, socketProvider, authProvider) {
  $stateProvider.state('start', {
    url: '/start', 
    templateUrl: 'start/start.tpl.html',
    controller: 'StartCtrl',
    resolve: {
      user: authProvider.requireUser,
      socketInfo: function(user, socket) {
        return socketProvider.requireAuthenticatedConnection(socket, user);
      }
    }
  });
})

// First screen: user chooses
// 'create': performer is slave to editor or
// 'play':  performer is master of editor/player
.controller('StartCtrl', function($scope, user) {
  console.log('startCtrl');
  $scope.room = user.organisation.rooms[0].name;
})
;


