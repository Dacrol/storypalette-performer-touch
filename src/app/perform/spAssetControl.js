angular.module('sp.performer.perform.spAssetControl', [])

.directive('spAssetControl', function($compile, $http, $templateCache) {
    // TODO: Move the templates to files and find out how to load them from this directive
    var sliderTemplate = '<div class="control {{asset.type}}_control">\n    <input id="slider" class="slider" min="0" max="1" step="0.01" type="range" ng-model="asset.value.raw" ng-init="asset.value.raw=0">\n    <b>{{asset.label}}</b>\n</div>';

    // All buttons get images
    //var buttonTemplate = '<div class="control {{asset.type}}_control">\n    <a href="" ng-model="controlValue" ng-model="asset.value.raw" ng-mousedown="buttonPressed()" ng-mouseup="buttonReleased()">\n        <img ng-src="/image/80x80/{{asset.source.id}}.{{asset.source.extension}}">    <i>{{asset.label || asset.name}}</i>\n    </a>\n</div>\n        \n';

    // Differentiate between sound and image buttons
    var buttonTemplate = '\n<ng-switch on="asset.type">\n\n    <div ng-switch-when="image" class="control {{asset.type}}_control">\n        <a href="" ng-model="controlValue" ng-model="asset.value.raw" ng-mousedown="buttonPressed()" ng-mouseup="buttonReleased()">    \n            <img ng-src="/image/80x80/{{asset.source.id}}.{{asset.source.extension}}">    <i>{{asset.label || asset.name}}</i>\n        </a>    \n    </div>\n    <div ng-switch-default class="control {{asset.type}}_control">\n        <a href="" ng-model="controlValue" ng-model="asset.value.raw" ng-mousedown="buttonPressed()" ng-mouseup="buttonReleased()">\n            <span>{{asset.type}}</span><i>{{asset.label || asset.name | uppercase}}</i>\n        </a>\n    </div>\n\n</ng-switch>';

    // Original button
    //var buttonTemplate = '<div class="control {{asset.type}}_control">\n    <a href="" ng-model="controlValue" \n       ng-model="asset.value.raw" \n       ng-mousedown="buttonPressed()" \n       ng-mouseup="buttonReleased()">\n    <b>{{asset.type}}</b><i>{{asset.label || asset.name | uppercase}}</i>\n    </a>\n </div>'; // var backup

    // Load the template for this control
    // TODO: Use external template. Doesn't work for now:
    // https://github.com/angular/angular.js/issues/2151
    var getTemplate = function(contentType) {
      var templateMap = {
        slider: sliderTemplate, //'perform/sp-control-slider.tpl.html',
        button: buttonTemplate  //'perform/sp-control-button.tpl.html'
      };
      contentType = contentType || 'button';

      var template = templateMap[contentType]; // $templateCache.get(templateMap[contentType]);
      return template;
  };

  var linker = function(scope, element, attrs) {
      // hack
      scope.asset.control = scope.asset.control || 'button';

      if (scope.asset.loop) {
        scope.asset.control = 'slider';
      }
      var tpl = getTemplate(scope.asset.control);

      element.html(tpl);
      $compile(element.contents())(scope);
    };

    // Return the directive specification
    return {
      restrict: 'E',
      scope: false,/*{
          asset: '=asset'   //TODO: We should probably move the AssetRunCtrl in here?
      }*/
      link: linker
    };
})
;
