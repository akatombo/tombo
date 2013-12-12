/**
 * @module Core
**/

var enhance = require('enhance');

module.exports = enhance(Object, function () {
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
	 * @method onAddedToEngine
	**/
	this.onAddedToEngine = function (/* engine */) {};

	/**
	 * @method onRemovedFromEngine
	**/
	this.onRemovedFromEngine = function (/* engine */) {};

	/**
	 * @method update
	**/
	this.update = function (/* time */) {};
});