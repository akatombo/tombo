/**
 * @module Core
**/

var hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = require('enhance')(Object, function () {
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
	this.from = function (schema) {
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