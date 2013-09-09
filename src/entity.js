var augment = require('augment');
var Map = require('map');


var Entity = augment(Object, function () {
	/**
	 * @class Entity
	 * @constructor
	**/
	this.constructor = function ()
		/**
		 * Contains all components attached to the entity
		 *
		 * @private
		 * @property _components
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
	 * @param {Component} componentInstance The added component
	**/

	/**
	 * Fired when a component is removed
	 *
	 * @event component:removed
	 * @param {Function} componentConstructor Constructor of the removed component
	 * @param {Component} componentInstance The removed component
	**/
	require('emitter')(this);

	/**
	 * Add a component, fire component:added event
	 *
	 * @method add
	 * @chainable
	 * @param {Function} componentConstructor
	 * @param {Component} componentInstance
	 * @return {Entity}
	**/
	this.add = function (componentConstructor, componentInstance) {
		this._components.set(componentConstructor, componentInstance);

		this.emit('component:added', componentConstructor, componentInstance);

		return this;
	};

	/**
	 * Remove a component with his constructor, fire component:removed event
	 *
	 * @method remove
	 * @param {Function} componentConstructor
	 * @return {Component|null}
	**/
	this.remove = function (componentConstructor) {
		var componentInstance = this._components.get(componentConstructor);
		
		if (componentInstance) {
			this._components.delete(componentConstructor);
			this.emit('component:removed', componentConstructor, componentInstance);
		}

		return component;
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

	/**
	 * 
	 *
	 * @method get
	 * @param {Function} componentConstructor
	 * @return {Boolean}
	**/
	this.has = function (componentConstructor) {
		return this._components.get(componentConstructor);
	};
});

module.exports = Entity;