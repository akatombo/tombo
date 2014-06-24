/**
 * @module tombo
**/
export default System;

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
 * @method update
 * @param {Number} deltaTime
 * @param {MapIterator} nodes
 * @param {Map} entities
 * @param {Engine} engine
**/
System.prototype.update = function (deltaTime, nodes, entities, engine) {};
