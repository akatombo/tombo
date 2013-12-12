/**
 * @module Core
**/

var enhance = require('enhance');
var uid = require('uid');
var Emitter = require('emitter');
var Map = require('map');

module.exports = enhance(Object, function () {
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

		/**
		 * entity unique identifier
		 *
		 * @property uid
		 * @readonly
		 * @type {String}
		**/
		this.uid = uid();
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
	Emitter(this);

	/**
	 * Add a component, fire component:added event
	 *
	 * @method add
	 * @chainable
	 * @param {Component} component
	 * @return {Entity}
	**/
	this.add = function add (component) {
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
	this.remove = function remove (componentConstructor) {
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
	this.has = function has (componentConstructor) {
		return this._components.has(componentConstructor);
	};

	/**
	 * Get a component with his constructor
	 *
	 * @method get
	 * @param {Function} componentConstructor
	 * @return {Component|null}
	**/
	this.get = function get (componentConstructor) {
		return this._components.get(componentConstructor);
	};

	/**
	 * Get all components
	 *
	 * @method getAll
	 * @return {Array}
	**/
	this.getAll = function getAll () {
		var component;
		var components = [];
		var iterator = this._components.values();
		
		while (component = iterator.next()) {
			components.push(component);
		}

		return components;
	};
});