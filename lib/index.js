
/**
 * Module dependencies.
 */

var integration = require('segmentio-integration');
var mapper = require('./mapper');

/**
 * Expose `autosend`
 *
 * http://autosend.io/faq/autosend-rest-api/
 */

var Autosend = module.exports = integration('autosend')
  .channels(['server', 'mobile', 'client'])
  .endpoint('https://app.autosend.io/api/v1')
  .ensure('settings.apiKey')
  .mapper(mapper)
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

Autosend.prototype.identify = function(payload, fn){
  return this
    .post()
    .send(payload)
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

Autosend.prototype.track = function(payload, fn){
  return this
    .post()
    .send(payload)
    .end(this.handle(fn));
};
