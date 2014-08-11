angular.module('sp.performer.perform.performCtrl', []) 

// Controller for the performance interface
.controller('PerformCtrl', function($scope, $stateParams, socket, performState) {

  $scope.palette = undefined;
  $scope.paletteUpdate = false;

  // Request a specific palette from the Editor or Media Player
  var requestedPaletteId = $stateParams['paletteId'];
  console.log('PerformCtrl', requestedPaletteId);
  socket.emit('requestPalette', requestedPaletteId);

  // We received a palette from Media Player.
  socket.on('onActivePalette', function(palette) {
    // Perform mode - only accept the requested palette
    if (palette._id === requestedPaletteId) {
      $scope.palette = palette;

      var resetData = PerformState.resetLights();
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


// Controller for the performance interface
/* OLD: Use PerformCtrl instead
.controller('PerformanceCtrl', function($scope, $routeParams, PaletteModel, socket) {

  $scope.isReady = false;
  $scope.controlValue = 0;    // silent faders

  // Ask if palette is running
  socket.emit('interfaceConnected', 'touch');

  // $scope.$watch('$scope.controlValue', function(newValue, oldValue, scope) {
  // console.log('controlValue changed from ' + oldValue + ' to ' + newValue);
  //  });

  // Called by spControl directive
  $scope.sendControlData = function(index, asset, value) {

      //
      console.log('PerformanceCtrl.sendControlData()', index, asset, value);

      var controlData = {
          timestamp: new Date().getTime(),
          index: index,
          type: asset.type,
          value: value
      };

      if (asset.type === 'light') {

          // Only set one colour in struct {red: 50} to enable mixing
          controlData.value = {};
          controlData.value.colour = {};
          controlData.value.fixtures = asset.params.fixtures;

          var colours = Object.keys(asset.params.colour);

          for (var i = 0; i < colours.length; i++) {
              console.log(colours[i]) ;
              controlData.value.colour[colours[i]] = value;
          }
      }
      console.log("Emitting control data: ", controlData);
      socket.emit('controlData', controlData);
  };

  $scope.touchStart = function() {
      // $window.alert('touchStart');
  };

  socket.on('onPaletteRun', function(palette) {
      console.log('Palette is running: ', palette);
      $scope.isReady = true;
      $scope.palette = palette;

  });

});

*/










