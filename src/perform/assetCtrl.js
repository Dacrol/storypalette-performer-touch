angular.module('sp.performer.perform.assetCtrl', []) 
// RUNTIME: Controller for individual assets in palette
// implied scope: $scope.$index; $scope.asset
.controller('AssetCtrl', function($scope, config, performState) {

  /*  // TODO: No local settings for now
  console.log(room, $scope.asset.local);
  if ($scope.asset.local && $scope.asset.local[room.id]){
      lightGroups = $scope.asset.local[room.id].groups;
  }*/

  $scope.$watch('asset.value.raw', function(newVal, oldVal) {
    //console.log('asset.value.raw', newVal, oldVal);
    // newVal can be undefined when the order of assets have changed
    if (oldVal !== newVal) { // ignore init fire
      if ($scope.paletteUpdate === false) {
        if (performState.updateValue($scope.asset)) {
          var data = {paletteId: $scope.palette._id, assetId: $scope.$index, value: $scope.asset.value};
          $scope.socket.emit('valueUpdate', data);
//        console.log('Value after valueUpdate', $scope.asset.value);
        }
      } else {
        $scope.paletteUpdate = false;
      }
    }
  });

  $scope.buttonPressed = function() {
    $scope.asset.value.raw = config.button.downValue;
  };

  $scope.buttonReleased = function() {
    $scope.asset.value.raw = config.button.upValue;
  };
})
;
