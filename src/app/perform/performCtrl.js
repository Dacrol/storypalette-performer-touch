angular.module('sp.performer.perform.performCtrl', []) 

.controller('PerformCtrl', function($scope, $location, $state, dialog, $urlRouter, $stateParams, socket, performState) {
  $scope.palette = undefined;
  $scope.paletteUpdate = false;

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
      $state.go(toState.name);
    });

    // Prevent navigation per default. Handle it after user confirmation.
    event.preventDefault(); 
    return;
  }

  // Request the palette from Player
  var requestedPaletteId = $stateParams['paletteId'];
  socket.emit('requestPalette', requestedPaletteId);

  // We received a palette from Media Player.
  socket.on('onActivePalette', function(palette) {
    //console.log('got palette', palette);
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










