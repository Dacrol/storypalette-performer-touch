angular.module('sp.performer.start', [
  'ui.router',
  'sp.performer.common.config',

  'spUtils'
])

.config(function($stateProvider) {
  $stateProvider.state('user.start', {
    url: '/start', 
    templateUrl: 'start/start.tpl.html',
    controller: 'StartCtrl',
    resolve: {
      players: function(user, config, utils) {
        console.log('players', user, config.apiBase);
        return utils.getUserRooms(user, config.apiBase);
      }
    }
  });
})

// First screen: user chooses
// 'create': performer is slave to editor or
// 'play':  performer is master of editor/player
.controller('StartCtrl', function($scope, user, players) {
  console.log('got players', players);
  $scope.rooms = players;
  $scope.room = user.organisation.rooms[0].name;
})
;


