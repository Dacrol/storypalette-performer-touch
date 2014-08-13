angular.module('sp.performer.start', [
  'uiAuth', 
  'uiSocket',
  'uiUtils',
  'ui.router'

])

.config(function($stateProvider, socketProvider, authProvider) {
  $stateProvider.state('start', {
    url: '/start', 
    templateUrl: 'start/start.tpl.html',
    controller: 'StartCtrl',
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
})

// First screen: user chooses
// 'create': performer is slave to editor or
// 'play':  performer is master of editor/player
.controller('StartCtrl', function($scope, user) {
  console.log('startCtrl', user);
  $scope.room = user.organisation.rooms[0].name;
})
;


