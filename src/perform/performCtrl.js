angular.module('sp.performer.perform.performCtrl', []) 

.controller('PerformCtrl', function($scope, $state, dialog, $stateParams, socket, performState) {
  $scope.palette = undefined;
  $scope.paletteUpdate = false;
  $scope.socket = socket; // Used by AssetCtrl

  // User needs to confirm before leaving this state.
  var stateChangeOff = $scope.$on('$stateChangeStart', stateChange);

  //function locChange(event, newUrl, oldUrl) {
  function stateChange(event, toState, toParams, fromState, fromParams) {
    dialog.confirm({
      title: 'Varning',
      message: 'Vill du sluta spela paletten?'
    })
    .then(function ok() {
      stateChangeOff();
      disconnect();
      $state.go(toState.name);
    });

    // Prevent navigation per default. Handle it after user confirmation.
    event.preventDefault(); 
    return;
  }

  // Stop playing palette.
  var disconnect = function() {
    console.log('disconnect from palette');
    socket.disconnect();
    //socket.removeAllListeners();
  };

  $scope.$on('$destroy', function() {
    console.log('PerformCtrl scope destroyed'); 
  });

  // Request the palette from Player
  var requestedPaletteId = $stateParams['paletteId'];
  socket.emit('requestPalette', requestedPaletteId);

  // We received a palette from Media Player.
  socket.on('onActivePalette', function(palette) {
    // Perform mode - only accept the requested palette
    if (palette._id === requestedPaletteId) {
      $scope.palette = palette;
      //var resetData = performState.resetLights();
      //socket.emit('valueUpdate', resetData);
    }
  });
})
;










