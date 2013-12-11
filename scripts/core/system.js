/**
 * @module Core
**/

var enhance = require('enhance');

/**
 * @class System
**/
var System = enhance(Object, function () {
	/**
	 * @property priority
	 * @type {Number}
	 * @default 0
	**/
	this.priority = 0;

	this.add = function () {};
	this.remove = function () {};

	this.update = function () {};
});

module.exports = System;
