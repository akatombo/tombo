/* jshint -W079 */
/**
 * @module Core
**/
var enhance = require('enhance');
var Set = require('./set');

module.exports = enhance(Set, function (base) {
	/**
	 * @class EntitySet
	 * @extends Set
	 * @constructor
	**/
	this.constructor = function EntitySet () {
		base.constructor.call(this);
	};
});