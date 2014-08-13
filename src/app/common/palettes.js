angular.module('sp.performer.common.palettes', [
  'sp.performer.common.config' 
])

.factory('palettes', function($http, config) {
  var apiBase = config.apiBase + 'palettes/'; // http://api.storypalette.net/palettes

  console.log('config', config);

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
