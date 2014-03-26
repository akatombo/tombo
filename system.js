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
 * @method run
 * @param {Number} deltaTime
 * @param {MapIterator} nodes
 * @param {Map} entities
 * @param {Engine} engine
**/
System.prototype.run = function (deltaTime, nodes, entities, engine) {};