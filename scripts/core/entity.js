/**
 * @module Core
**/

var Map = require('map');

module.exports = require('enhance')(Object, function () {
	/**
	 * @class Entity
	 * @constructor
	**/
	this.constructor = function Entity () {
		/**
		 * Contains all components attached to the entity
		 *
		 * @property _components
		 * @private
		 * @type {Map}
		 * @default new Map()
		**/
		this._components = new Map();
	};


	/**
	 * Fired when a component is added
	 *
	 * @event component:added
	 * @param {Component} component The added component
	 * @param {Function} componentConstructor Constructor of the added component
	**/

	/**
	 * Fired when a component is removed
	 *
	 * @event component:removed
	 * @param {Component} component The removed component
	 * @param {Function} componentConstructor Constructor of the removed component
	**/
	require('emitter')(this);

	/**
	 * Add a component, fire component:added event
	 *
	 * @method add
	 * @chainable
	 * @param {Component} component
	 * @return {Entity}
	**/
	this.add = function (component) {
		componentConstructor = component.constructor;
		this._components.set(componentConstructor, component);

		this.emit('component:added', component, componentConstructor);

		return this;
	};

	/**
	 * Remove a component with his constructor, fire component:removed event
	 *
	 * @method remove
	 * @param {Function} componentConstructor
	 * @return {Component|false}
	**/
	this.remove = function (componentConstructor) {
		var component = this._components.get(componentConstructor);
		var deleted = this._components.delete(componentConstructor);

		return deleted
			? this.emit('component:removed', component, componentConstructor) && component
			: false
		;
	};

	/**
	 * Check if has component with his constructor
	 *
	 * @method has
	 * @param {Function} componentConstructor
	 * @return {Boolean}
	**/
	this.has = function (componentConstructor) {
		return this._components.has(componentConstructor);
	};

	/**
	 * Get a component with his constructor
	 *
	 * @method get
	 * @param {Function} componentConstructor
	 * @return {Component|null}
	**/
	this.get = function (componentConstructor) {
		return this._components.get(componentConstructor);
	};

	/**
	 * Get all components
	 *
	 * @method getAll
	 * @return {Array}
	**/
	this.getAll = function () {
		var component;
		var components = [];
		var iterator = this._components.values();
		
		while (component = iterator.next()) {
			components.push(component);
		}

		return components;
	};
});