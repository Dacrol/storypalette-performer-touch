angular.module('sp.performer.perform', [
  'sp.performer.perform.performCtrl',
  'sp.performer.perform.assetCtrl',

  'sp.performer.perform.performState',
  'sp.performer.perform.spAssetControl',

  'ui.router'
])

.config(function($stateProvider) {
  $stateProvider.state('user.perform', {
    url: '/palettes/:paletteId', 
    templateUrl: 'perform/perform.tpl.html',
    controller: 'PerformCtrl'
  });
})
;


