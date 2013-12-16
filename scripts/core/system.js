/**
 * @module Core
**/

var enhance = require('enhance');

module.exports = enhance(Object, function () {
	/**
	 * @class System
	 * @constructor
	**/
	this.constructor = function System (priority) {
		this.priority = priority || 0;
	};

	/**
	 * @property priority
	 * @type {Number}
	 * @default 0
	**/
	this.priority = 0;

	/**
	 * method called when system is added to an engine
	 * @method add
	**/
	this.add = function (/* engine */) {};

	/**
	 * method called when system is removed to an engine
	 * @method remove
	**/
	this.remove = function (/* engine */) {};

	/**
	 * method called for entities updates
	 * @method update
	**/
	this.update = function (/* time */) {};
});