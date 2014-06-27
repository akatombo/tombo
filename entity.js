/** @module tombo/entity **/

import inherit from 'inherit';
import uid from 'uid';
import Emitter from 'emitter';

export default Entity;

// TODO: add .removeAll() ?
// TODO: add .getAll() ?

/**
 * @class @extends Emitter
**/
function Entity () {
	/**
	 * The entity unique identifier
	 * @readonly
	 * @type {String}
	**/
	this.uid = uid();

	/**
	 * List of all entity's components
	 * @private
	 * @type {Map}
	**/
	this.components = new Map();
}

inherit(Entity, Emitter);

/**
 * Add a component to the entity
 *
 * @method
 * @fires Entity#component:added
 * @param {Component} component
 * @return {Entity}
**/
Entity.prototype.add = function add (component) {
	let componentConstructor = component.constructor;
	this.components.set(componentConstructor, component);

	/**
	 * @event Entity#component:added
	**/
	this.emit('component:added', this, component, componentConstructor);

	return this;
};

/**
 * Remove a component with his constructor from the entity
 *
 * @method
 * @fires Entity#component:removed
 * @param {Function} componentConstructor
 * @return {Entity}
**/
Entity.prototype.remove = function remove (componentConstructor) {
	if (this.components.has(componentConstructor)) {
		let component = this.components.get(componentConstructor);
		this.components.delete(componentConstructor);

		/**
		 * @event Entity#component:removed
		**/
		this.emit('component:removed', this, component, componentConstructor);
	}

	return this;
};

/**
 * Check if has component with his constructor
 *
 * @method
 * @param {Function} componentConstructor
 * @return {Boolean}
**/
Entity.prototype.has = function has (componentConstructor) {
	return this.components.has(componentConstructor);
};

/**
 * Get a component with his constructor
 *
 * @method
 * @param {Function} componentConstructor
 * @return {?Component}
**/
Entity.prototype.get = function get (componentConstructor) {
	return this.components.get(componentConstructor);
};
