
import template from './perform.tpl.html';
import performCtrl from './performCtrl.js';
import assetCtrl from './assetCtrl.js';
import performState from '../common/performState.js';
import spAssetControl from './spAssetControl.js';
import spConnection from '../common/spConnection/connection.js';
import uiDialog from '../common/uiDialog/uiDialog.js'
import uirouter from 'angular-ui-router';
import '../header.tpl.html';

angular.module('perform', [
  'performCtrl',
  'assetCtrl',

  'performState',
  'spAssetControl',

  'spConnection', 
  'uiDialog',

  'ui.router'
])

.config(function($stateProvider) {
  $stateProvider.state('user.perform', {
    url: '/palettes/:paletteId', 
    templateUrl: template,
    controller: 'PerformCtrl',
    resolve: {
      socket: function($q, user, connection, utils, auth, performState) {
        if (!performState.room) {
          // No room selected - cause redirect via $stateChangeError.
          return $q.reject('user.perform resolve: no room selected');
        }
        var ns = utils.getSocketNamespace(user);
        var token = auth.getToken(); 
        var room = performState.room.id;
        return connection.requireRoomConnection(ns, room, token);
      }
    }
  });
})
;


