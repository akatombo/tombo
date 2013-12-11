/**
 * @module Core
**/

module.exports = require('enhance')(Object, function () {
	/**
	 * @class System
	 * @constructor
	**/
	this.constructor = function System () {};

	/**
	 * @property priority
	 * @type {Number}
	 * @default 0
	**/
	this.priority = 0;

	/**
	 * @method add
	**/
	this.add = function () {};

	/**
	 * @method remove
	**/
	this.remove = function () {};

	/**
	 * @method update
	**/
	this.update = function () {};

	/**
	 * @method beforeUpdate
	**/
	this.beforeUpdate = function () {};

	/**
	 * @method afterUpdate
	**/
	this.afterUpdate = function () {};
});