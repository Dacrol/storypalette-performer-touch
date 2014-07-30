angular.module('sp.performer.start', [
  'ui.router',
  'security'
])

.config(function($stateProvider, securityAuthorizationProvider) {
  $stateProvider.state('start', {
    url: '/', 
    templateUrl: 'start/start.tpl.html',
    controller: 'StartCtrl',
    resolve: {
      knas: function() {
        console.log('knase');
      },
      user: securityAuthorizationProvider.requireAuthenticatedUser
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


