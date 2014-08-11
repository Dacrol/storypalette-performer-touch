angular.module('sp.performer.palettes', [
  'sp.performer.common.palettes',

  'uiSocket',
  'uiAuth',

  'ui.router'
])

.config(function($stateProvider, socketProvider, authProvider) {




  // Select palette or create new
  $stateProvider.state('palettes', {
    url: '/palettes', 
    templateUrl: 'palettes/palettes.tpl.html',
    controller: 'PalettesCtrl',
    resolve: {
      user: authProvider.requireUser,
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
