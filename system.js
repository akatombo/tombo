/** @module tombo/system **/

export default System;

/**
 * @abstract @class
**/
function System () {}

/**
 * @type {Object}
**/
System.prototype.require = {};

/**
 * @abstract @method
 * @param {Number} deltaTime
 * @param {MapIterator} nodes
 * @param {Map} entities
 * @param {Engine} engine
**/
System.prototype.update = function (deltaTime, nodes, entities, engine) {};
