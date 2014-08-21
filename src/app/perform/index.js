angular.module('sp.performer.perform', [
  'sp.performer.perform.performCtrl',
  'sp.performer.perform.assetCtrl',

  'sp.performer.perform.performState',
  'sp.performer.perform.spAssetControl',

  'spConnection', 
  'uiDialog',

  'ui.router'
])

.config(function($stateProvider) {
  $stateProvider.state('user.perform', {
    url: '/palettes/:paletteId', 
    templateUrl: 'perform/perform.tpl.html',
    controller: 'PerformCtrl',
    resolve: {
      socket: function($q, user, connection, utils, auth, performState) {
        if (!performState.roomId) {
          // No room selected - cause redirect via $stateChangeError.
          return $q.reject('user.perform resolve: no room selected');
        }
        var ns = utils.getSocketNamespace(user);
        var token = auth.getToken(); 
        var room = performState.roomId;
        return connection.requireRoomConnection(ns, room, token);
      }
    }
  });
})
;


