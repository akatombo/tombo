import inherit from 'inherit';
import uid from 'uid';
import Emitter from 'emitter';
import Map from 'map';

// TODO: .removeAll() ?
// TODO: .getAll() ?

/**
 * @module tombo
**/
export default Entity;

/**
 * @class Entity
 * @constructor
**/
function Entity () {
	/**
	 * entity unique identifier
	 *
	 * @property $id
	 * @readonly
	 * @type {String}
	**/
	this.$id = uid();

	/**
	 * Contains all components attached to the entity
	 *
	 * @property components
	 * @private
	 * @type {Map}
	 * @default new Map()
	**/
	this.components = new Map();
}

/**
 * Fired when a component is added
 *
 * @event component:added
 * @param {Entity} entity
 * @param {Component} component
 * @param {Function} componentConstructor
**/

/**
 * Fired when a component is removed
 *
 * @event component:removed
 * @param {Entity} entity
 * @param {Component} component
 * @param {Function} componentConstructor
**/
inherit(Entity, Emitter);

/**
 * Add a component, fire component:added event
 *
 * @method add
 * @chainable
 * @param {Component} component
 * @return {Entity}
**/
Entity.prototype.add = function add (component) {
	var componentConstructor = component.constructor;
	this.components.set(componentConstructor, component);

	this.emit('component:added', this, component, componentConstructor);

	return this;
};

/**
 * Remove a component with his constructor, fire component:removed event
 *
 * @method remove
 * @chainable
 * @param {Function} componentConstructor
 * @return {Entity}
**/
Entity.prototype.remove = function remove (componentConstructor) {
	if (this.components.has(componentConstructor)) {
		var component = this.components.get(componentConstructor);
		this.components.delete(componentConstructor);

		this.emit('component:removed', this, component, componentConstructor);
	}

	return this;
};

/**
 * Check if has component with his constructor
 *
 * @method has
 * @param {Function} componentConstructor
 * @return {Boolean}
**/
Entity.prototype.has = function has (componentConstructor) {
	return this.components.has(componentConstructor);
};

/**
 * Get a component with his constructor
 *
 * @method get
 * @param {Function} componentConstructor
 * @return {Component|null}
**/
Entity.prototype.get = function get (componentConstructor) {
	return this.components.get(componentConstructor);
};
