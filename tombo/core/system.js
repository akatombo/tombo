/**
 * @module core
**/
module.exports = System;

/**
 * @class System
 * @constructor
**/
function System () {}

/**
 *
 * @property require
 * @type {Object}
 * @default {}
**/
System.prototype.require = {};

/**
 * called when system is added to an engine
 * @method add
**/
System.prototype.whenAddedToEngine = function () {};

/**
 * called when system is removed to an engine
 * @method remove
**/
System.prototype.whenRemovedFromEngine = function () {};

/**
 * called for entities updates
 * @method run
**/
System.prototype.run = function () {};