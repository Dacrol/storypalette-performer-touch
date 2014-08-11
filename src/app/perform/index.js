angular.module('sp.performer.perform', [
  'sp.performer.perform.performCtrl',
  'sp.performer.perform.assetCtrl',

  'sp.performer.perform.performState',
  'sp.performer.perform.spAssetControl',

  'uiSocket',
  'uiAuth',

  'ui.router'
])

.config(function($stateProvider, socketProvider, authProvider) {

  $stateProvider.state('perform', {
    url: '/palettes/:paletteId', 
    templateUrl: 'perform/perform.tpl.html',
    controller: 'PerformCtrl',
    resolve: {
      user: authProvider.requireUser,
      socketInfo: function(user, socket) {
        return socketProvider.requireAuthenticatedConnection(socket, user);
      }
    }
  });
})
;


