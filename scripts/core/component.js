/**
 * @module Core
**/

var hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = require('enhance')(Object, function () {
	/**
	 * @class Component
	 * @constructor
	 * @param {Object} from
	**/
	this.constructor = function Component (from) {
		for (var property in from) {
			if (hasOwnProperty.call(from, property)) {
				this[property] = from[property];
			}
		}
	};
});