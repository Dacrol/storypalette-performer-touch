angular.module('performerCommonPalettes', [
  'performerConfig' 
])

.factory('palettes', function($http, config) {
  var apiBase = config.apiBase + 'palettes/'; // http://api.storypalette.net/palettes

  // Public API
  return {
    all: function() {
      return $http.get(apiBase).then(function(response) {
        return response.data;
      });
    }
  };
})
;
