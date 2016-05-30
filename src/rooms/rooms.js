
import template from './rooms.tpl.html';
import uirouter from 'angular-ui-router';
import performerConfig from '../common/config.js';
import spUtils from '../common/spUtils/utils.js';
import '../header.tpl.html';

angular.module('rooms', [
  'ui.router',
  'performerConfig',
  'spUtils'
])

.config(function($stateProvider) {
  $stateProvider.state('user.rooms', {
    url: '/rooms', 
    templateUrl: template,
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
    performState.room = room; 
    $state.go('user.palettes');
  };

  if (rooms.length === 1) {
    // Auto-select the only room.
    $scope.setRoom(rooms[0]);
  }
  //$scope.room = user.organisation.rooms[0].name;
})
;


