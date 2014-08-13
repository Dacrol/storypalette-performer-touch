angular.module('sp.performer.start', [
  'uiUtils',
  'ui.router'
])

.config(function($stateProvider) {
  $stateProvider.state('user.start', {
    url: '/start', 
    templateUrl: 'start/start.tpl.html',
    controller: 'StartCtrl'
  });
})

// First screen: user chooses
// 'create': performer is slave to editor or
// 'play':  performer is master of editor/player
.controller('StartCtrl', function($scope, user) {
  $scope.room = user.organisation.rooms[0].name;
})
;


