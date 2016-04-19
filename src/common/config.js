angular.module('sp.performer.common.config', [])

.constant('config', {
  version: {
    number: '0.6.0',
    name: 'Red Eyes Performer'
  },
  sound: {
    silenceThreshold: 0.02,                 // Snap volume to 0 if below this value
    defaultButtonBehaviour: 'toggle'        // If no other behaviour was specified
  },
  image: {
    defaultButtonBehaviour: 'toggle'
  },
  button: {
    downValue: 666,
    upValue: -666
  },
  environment: window.env.environment || 'local',
  apiBase: window.env.apiBase
})
;
