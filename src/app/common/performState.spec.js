describe('sp.performer.common.performState', function() {

  beforeEach(module('sp.performer.common.performState'));
  beforeEach(module('sp.performer.common.config'));

  describe('performState service', function() {
    var config;
    var performState;

    beforeEach(inject(function(_config_, _performState_) {
      config = _config_;
      performState = _performState_;
    }));

    it('should be defined', function() {
      expect(performState).toBeDefined();
    });

  });

});  
