
import template from './palettes.tpl.html';
import uirouter from 'angular-ui-router';
import performerCommonPalettes from '../common/palettes.js';
import '../header.tpl.html';

angular.module('palettes', [
  'performerCommonPalettes',
  'ui.router'
])

.config(function($stateProvider) {
  // Select palette or create new
  $stateProvider.state('user.palettes', {
    url: '/palettes', 
    templateUrl: template,
    controller: 'PalettesCtrl',
    resolve: {
      allPalettes: function(palettes) {
        return palettes.all();
      }
    }
  });
})

.controller('PalettesCtrl', function($scope, allPalettes, user) {
  $scope.palettes = allPalettes;
  $scope.user = user;
  $scope.userFilter = '';

  $scope.filterPalettes = function(filter) {
    $scope.userFilter = (filter === 'user') ? $scope.user._id : '';
  };
})
;
