var enhance = require('enhance');
var Map = require('map');

var Entity = enhance(Object, function () {
	/**
	 * @class Entity
	 * @constructor
	**/
	this.constructor = function () {
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
	 * @param {Function} componentConstructor Constructor of the added component
	 * @param {Component} component The added component
	**/

	/**
	 * Fired when a component is removed
	 *
	 * @event component:removed
	 * @param {Function} componentConstructor Constructor of the removed component
	 * @param {Component} component The removed component
	**/
	require('emitter')(this);

	/**
	 * Add a component, fire component:added event
	 *
	 * @method add
	 * @chainable
	 * @param {Function} componentConstructor
	 * @param {Component} component
	 * @return {Entity}
	**/
	this.add = function (componentConstructor, component) {
		this._components.set(componentConstructor, component);

		this.emit('component:added', componentConstructor, component);

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
			? this.emit('component:removed', componentConstructor, component) && component
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

module.exports = Entity;