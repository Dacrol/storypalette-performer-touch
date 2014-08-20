angular.module('sp.performer.perform', [
  'sp.performer.perform.performCtrl',
  'sp.performer.perform.assetCtrl',

  'sp.performer.perform.performState',
  'sp.performer.perform.spAssetControl',

  'uiSocket', 

  'ui.router'
])

.config(function($stateProvider, socketProvider) {
  $stateProvider.state('user.perform', {
    url: '/palettes/:paletteId', 
    templateUrl: 'perform/perform.tpl.html',
    controller: 'PerformCtrl',
    onExit: function(user, socket) {
      console.log('exit perform'); 
    },
    onEnter: function() {
      console.log('onEnter'); 
    },
    resolve: {
      socketInfo: function($q, user, socket, utils, auth, performState) {
        if (!performState.roomId) {
          // No room selected - cause redirect via $stateChangeError.
          return $q.reject('user.perform resolve: no room selected');
        }
        
        var ns = utils.getSocketNamespace(user);
        var token = auth.getToken(); 
        return socketProvider.requireAuthenticatedConnection(socket, ns, performState.roomId, token);
      }
    }
  });
})
;


