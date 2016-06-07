import performerConfig from './config.js';

var _ = require('underscore');

angular.module('sp.performer.common.performState', [
  'sp.performer.common.config',
])

  // Service that encapsulates the logic of performed assets
.factory('performState', function(config) {
  var palette;
  var prevImageAssetId;
  var soundAssets;
  var room;
  var lightGroups;

  // Light
  var updateLightValue = function(asset, groups) {
    //console.log('asset', asset, 'groups', groups);
    //var lightGroups = ['A', 'B', 'C'];      // TODO: Hacky - hardcorded light groups!
    var value = asset.value;
    value.colour = {};

    // Which RGB does this asset affect
    var colours = Object.keys(asset.colour);        // returns ['red','green','blue']
    for (var i = 0; i < colours.length; i++) {
      value.colour[colours[i]] = asset.colour[colours[i]] * value.raw;
    }
    value.groups = groups;
    return true;
  };

  // Sound
  var updateSoundValue = function (asset) {
    var value = asset.value;
    var control = asset.control || 'slider';
    var behaviour = asset.behaviour || config.sound.defaultButtonBehaviour;

    if (control === 'slider') {
      value.volume = value.raw * (asset.maxVolume || 1);
      value.volume = value.volume < config.sound.silenceThreshold ? 0 : value.volume;
      return true;
    } else if (control === 'button') {
      if (value.raw === config.button.downValue) {
        // Button pressed
        switch (behaviour) {
          case 'gate':
            value.state = 'playing';
            return true;
          case 'toggle':
            value.state = (value.state === 'playing') ? 'stopped' : 'playing';
            return true;
          default:
            console.log('Unknown behaviour type: ', behaviour);
            return false;
        }
      } else if (value.raw === config.button.upValue) {
          // Button released
          switch (behaviour) {
            case 'gate':
              value.state = 'stopped';
              return true;
            case 'toggle':
              return false;
        }
      }
    } else {
      console.log('Unknown control type');
      return false;
    }
  };

  // Image
  var updateImageValue = function (asset) {
    var value = asset.value;
    var behaviour = asset.behaviour || config.image.defaultButtonBehaviour;

    if (value.raw === config.button.downValue) {
      // Button pressed
      switch (behaviour) {
        case 'gate':
          value.opacity = 1;
          return true;
        case 'toggle':
          if (asset.id !== prevImageAssetId) {
              // New image clicked - always show
              value.opacity = 1;
          } else {
            // Same image - toggle visibility
            value.opacity = (value.opacity === 1) ? 0 : 1;
          }
          prevImageAssetId = asset.id;
          return true;
        default:
          console.log('Unknown behaviour type: ', behaviour);
          return false;
      }
    } else if (value.raw === config.button.upValue) {
      // Button released
      switch (behaviour) {
        case 'gate':
          value.opacity = 0;
          return true;
        case 'toggle':
          return false;  // ignore mouseup
      }
    } else {
      console.log('Sliders to be implemented...');
      return false;
    }
  };

  // Public API
  var service = {
    // Currently selected room.
    get room() {
      return room; 
    },
    set room(roomData) {
      // TODO: Calculate dmx stuff;
      room = roomData; 
      lightGroups = _.map(room.dmx.groups, 'id');
    },
    init: function(currPalette) {
      palette = currPalette;

      // Store sound assets for easy lookup
      for (var i = 0; i < palette.assets.length; i++) {
        if (palette.assets[i].type === 'sound') {
          soundAssets[palette.assets[i].id] = palette.assets[i];
        }
      }
    },

    // Return data for blacking out all the lights
    resetLights: function() {
      var pseudoAsset = {colour: {red:1, blue:1, green:1}, value:{raw:0}};
      updateLightValue(pseudoAsset);
      return {paletteId: null, assetId: null, value: pseudoAsset.value};
    },

    // Returns true if an event should be sent, false if not
    updateValue: function(asset) {
      switch (asset.type) {
        case 'light':
          return updateLightValue(asset, lightGroups);
        case 'sound':
          return updateSoundValue(asset);
        case 'image':
          return updateImageValue(asset);
        default:
          throw new Error('Unknown asset type');
      }
    }
  };

  return service;
})
;
