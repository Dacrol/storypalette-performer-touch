angular.module('sp.performer.palettes', [
  'sp.performer.common.palettes',
  'ui.router',

  'security',
  'uiSocket'
])

.config(function($stateProvider, socketProvider, securityAuthorizationProvider) {
  // Select palette or create new
  $stateProvider.state('palettes', {
    url: '/palettes', 
    templateUrl: 'palettes/palettes.tpl.html',
    controller: 'PalettesCtrl',
    resolve: {
      user: securityAuthorizationProvider.requireAuthenticatedUser,
      socketInfo: function(user, socket) {
        return socketProvider.requireAuthenticatedConnection(socket, user);
      },
      allPalettes: function(palettes) {
        return palettes.all();
      }
    }
  });
})

.controller('PalettesCtrl', function($scope, allPalettes) {
  $scope.palettes = allPalettes;
})
;
