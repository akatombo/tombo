/**
 * @module tombo
**/
module.exports = System;

/**
 * @class System
 * @constructor
**/
function System () {}

/**
 * @property require
 * @type {Object}
 * @default {}
**/
System.prototype.require = {};

/**
 * called for entities updates
 * @method run
 * @param {Number} deltaTime
 * @param {MapIterator} entities
**/
System.prototype.run = function (deltaTime, entities) {};