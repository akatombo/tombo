/**
 * @module Core
**/

var Set = require('./set');

module.exports = require('enhance')(Set, function (base) {
	/**
	 * @class NodeSet
	 * @constructor
	**/
	this.constructor = function NodeSet () {};



	/**
	 * Fired when a node is added
	 *
	 * @event node:added
	 * @param {Node} node The added node
	**/

	/**
	 * Fired when a node is removed
	 *
	 * @event node:removed
	 * @param {Node} node The removed node
	**/
	require('emitter')(this);


	/**
	 * Add a node
	 *
	 * @method add
	 * @chainable
	 * @param {Node} node
	 * @return {NodeSet}
	**/
	this.add = function (node) {
		base.add.call(this, node);
		this.emit('node:added', node);
		return this;
	};

	/**
	 * Remove a node
	 *
	 * @method remove
	 * @chainable
	 * @param {Node} node
	 * @return {NodeSet}
	**/
	this.remove = function (node) {
		base.remove.call(this, node);
		this.emit('node:removed', node);
		return this;
	};

	/**
	 * Remove all system
	 *
	 * @method clear
	 * @chainable
	 * @return {NodeSet}
	**/
	this.clear = function () {
		var node;

		while (this.head) {
			node = this.head;
			this.head = node.$next;
			node.$previous = node.$next = null;
			this.emit('node:removed', node);
		}

		this.tail = null;
		return this;
	};
});