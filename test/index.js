var Test = require('segmentio-integration-tester');
var Autosend = require('../');

describe('Autosend', function(){
  var autosend;
  var settings;
  var test;

  beforeEach(function(){
    settings = {
      apiKey: '8e0c3a35837b43c88f1c135294a65896',
      apiSecret: '859371e394824264bc314fe7c2def4cc'
    };
    autosend = new Autosend(settings)
    test = Test(autosend, __dirname);
  });

  it('should have the correct settings', function(){
    test
      .name('Autosend')
      .channels(['server', 'mobile', 'client'])
      .ensure('settings.apiKey')
      .ensure('settings.apiSecret')
      .retries(2);
  });

  describe('.validate()', function(){
    it('should not be valid without an api key', function(){
      delete settings.apiKey;
      test.invalid({}, settings);
    });

    it('should be valid with complete settings', function(){
      test.valid({}, settings);
    });
  });

  describe('.identify()', function(){
    it('should send basic identify', function(done){
      var json = test.fixture('identify-basic');
      var output = json.output;
      output.timestamp = new Date(output.timestamp);
      test
        .identify(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should error on invalid key', function(done){
      var json = test.fixture('identify-basic');
      test
        .set({ apiKey: 'x' })
        .identify(json.input)
        .error('cannot PUT /api/v1/customers/user-id (401)', done);
    });
  });

  describe('.track()', function(){
    it('should send basic track', function(done){
      var json = test.fixture('track-basic');
      var output = json.output;
      output.timestamp = new Date(output.timestamp);
      test
        .track(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should error on invalid key', function(done){
      var json = test.fixture('track-basic');
      test
        .set({ apiKey: 'x' })
        .track(json.input)
        .error('cannot POST /api/v1/customers/345/track (401)', done);
    });
  });
});