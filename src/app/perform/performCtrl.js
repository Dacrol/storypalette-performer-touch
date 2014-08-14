angular.module('sp.performer.perform.performCtrl', []) 

.controller('PerformCtrl', function($scope, $stateParams, socket, performState) {
  $scope.palette = undefined;
  $scope.paletteUpdate = false;

  // Request the palette from Player
  var requestedPaletteId = $stateParams['paletteId'];
  console.log('PerformCtrl: palette', requestedPaletteId);
  socket.emit('requestPalette', requestedPaletteId);

  // We received a palette from Media Player.
  socket.on('onActivePalette', function(palette) {
    // Perform mode - only accept the requested palette
    if (palette._id === requestedPaletteId) {
      $scope.palette = palette;

      var resetData = performState.resetLights();
      socket.emit('valueUpdate', resetData);
    }
  });

  // Palette was deactivated in Editor or Media Player
  socket.on('onPaletteDeactivate', function() {
    // Editor closed palette
    console.log('deactivate');
   // $scope.paletteInactive = true;
  });
})
;










