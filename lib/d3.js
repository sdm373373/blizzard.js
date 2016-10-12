/**
 * @file Exports the Diablo 3 API methods.
 * @module lib/d3
 */
'use strict';

/**
 * Diablo 3 class constructor.
 *
 * @constructor
 * @param  {Object} blizzard A Blizzard.js instance
 * @return {Function}        D3 constructor function
 */
const D3 = function D3 (blizzard) {
  this.get = blizzard.get;
};

/**
 * Fetch a Diablo 3 data resource.
 *
 * @param  {Object} key           The resource key
 * @param  {Object} args          The resource request arguments
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @return {Promise}              A thenable Promises/A+ reference
 */
D3.prototype.data = function data (key, args) {
  return this.get(`/d3/data/${key}/${args.id.replace(/^item\//, '')}`, args);
};

/**
 * Fetch Diablo 3 era data.
 *
 * @param  {Object} args               The era request arguments
 * @param  {String} [args.id]          The era id
 * @param  {String} [args.leaderboard] The era leadeboard id
 * @param  {String} [args.origin]      The region key
 * @param  {String} [args.locale]      A locale code for this region
 * @return {Promise}                   A thenable Promises/A+ reference
 */
D3.prototype.era = function era (args) {
  if (!args.id) {
    return this.get('/data/d3/era/', args);
  }

  if (!args.leaderboard) {
    return this.get(`/data/d3/era/${args.id}`, args);
  }

  return this.get(`/data/d3/era/${args.id}/leaderboard/${args.leaderboard}`, args);
};

/**
 * Fetch Diablo 3 profile data.
 *
 * @param  {Object} args          The profile request arguments
 * @param  {String} args.tag      The user battletag
 * @param  {String} [args.hero]   The hero name
 * @param  {String} [args.origin] The region key
 * @param  {String} [args.locale] A locale code for this region
 * @return {Promise}              A thenable Promises/A+ reference
 */
D3.prototype.profile = function profile (args) {
  if (!args.hero) {
    return this.get(`/d3/profile/${args.tag}/`, args);
  }

  return this.get(`/d3/profile//${args.tag}/hero/${args.hero}`, args);
};

/**
 * Fetch Diablo 3 season data.
 *
 * @param  {Object} args               The season request arguments
 * @param  {String} [args.season]      The season ID
 * @param  {String} [args.leaderboard] The season leaderboard ID
 * @param  {String} [args.origin]      The region key
 * @param  {String} [args.locale]      A locale code for this region
 * @return {Promise}                   A thenable Promises/A+ reference
 */
D3.prototype.season = function profile (args) {
  if (!args.season && !args.leaderboard) {
    return this.get('/data/d3/season/', args);
  }

  if (!args.leaderboard) {
    return this.get(`/data/d3/season/${args.season}`, args);
  }

  return this.get(`/data/d3/season/${args.season}/${args.leaderboard}`, args);
};

module.exports = D3;