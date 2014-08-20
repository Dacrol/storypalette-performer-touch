angular.module('sp.performer.rooms', [
  'ui.router',
  'sp.performer.common.config',

  'spUtils'
])

.config(function($stateProvider) {
  $stateProvider.state('user.rooms', {
    url: '/rooms', 
    templateUrl: 'rooms/rooms.tpl.html',
    controller: 'RoomsCtrl',
    resolve: {
      rooms: function(user, config, utils) {
        return utils.getUserRooms(user, config.apiBase);
      }
    }
  });
})

.controller('RoomsCtrl', function($scope, user, performState, rooms, $state) {
  $scope.rooms = rooms;

  $scope.setRoom = function(room) {
    performState.roomId = room.id; 
    $state.go('user.palettes');
  };

  if (rooms.length === 1) {
    // Auto-select the only room.
    $scope.setRoom(rooms[0]);
  }
  //$scope.room = user.organisation.rooms[0].name;
})
;


