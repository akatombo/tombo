/**
 * @module Core
**/

var hasOwnProperty = Object.prototype.hasOwnProperty;
var enhance = require('enhance');

module.exports = enhance(Object, function () {
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