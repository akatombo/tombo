/**
 * @module Core
**/

var hasOwnProperty = Object.prototype.hasOwnProperty;
var enhance = require('enhance');

module.exports = enhance(Object, function () {
	/**
	 * @class Node
	 * @constructor
	**/
	this.constructor = function Node () {};
}, function () {
	/**
	 * @method from
	 * @static
	 * @param {Object} schema
	 * @return {Function}
	**/
	this.from = function from (schema) {
		var definition = {
			$constructors: {}
		};

		for (var property in schema) {
			if (hasOwnProperty.call(schema, property)) {
				definition[property] = null;
				definition.$constructors[property] = schema[property];
			}
		}

		return enhance(this, definition);
	};
});