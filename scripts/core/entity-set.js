/* jshint -W079 */
/**
 * @module Core
**/
var enhance = require('enhance');
var Set = require('./set');

module.exports = enhance(Set, function () {
	/**
	 * @class EntitySet
	 * @constructor
	**/
	this.constructor = function EntitySet () {};
});