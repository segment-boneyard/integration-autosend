
/**
 * Module dependencies.
 */

var integration = require('segmentio-integration');

/**
 * Expose `autosend`
 *
 * http://autosend.io/faq/autosend-rest-api/
 */

var Autosend = module.exports = integration('Autosend')
  .channels(['server', 'mobile', 'client'])
  .endpoint('https://app.autosend.io/api/v1')
  .ensure('settings.apiKey')
  .ensure('settings.apiSecret')
  .retries(2);

/**
 * Identify.
 *
 * http://autosend.io/faq/autosend-rest-api/
 *
 * @param {Object} payload
 * @param {Function} fn
 * @api public
 */

Autosend.prototype.identify = function(identify, fn){
  return this
    .put('/customers/' + identify.userId())
    .type('form')
    .auth(this.settings.apiKey, this.settings.apiSecret)
    .send(identify.json())
    .end(this.handle(fn));
};

/**
 * Track.
 *
 * http://autosend.io/faq/autosend-rest-api/
 *
 * @param {Object} payload
 * @param {Function} fn
 * @api public
 */

Autosend.prototype.track = function(track, fn){
  return this
    .post('/customers/' + track.userId() + '/track')
    .type('form')
    .auth(this.settings.apiKey, this.settings.apiSecret)
    .send(track.json())
    .end(this.handle(fn));
};
