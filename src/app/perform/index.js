angular.module('sp.performer.perform', [
  'sp.performer.perform.performCtrl',
  'sp.performer.perform.assetCtrl',

  'sp.performer.perform.performState',
  'sp.performer.perform.spAssetControl',

  'uiSocket',
  'security'
])

.config(function($stateProvider, socketProvider, securityAuthorizationProvider) {
  $stateProvider.state('perform', {
    url: '/palettes/:paletteId', 
    templateUrl: 'perform/perform.tpl.html',
    controller: 'PerformCtrl',
    resolve: {
      user: securityAuthorizationProvider.requireAuthenticatedUser,
      socketInfo: function(user, socket) {
        return socketProvider.requireAuthenticatedConnection(socket, user);
      }
    }
  });
})
;


