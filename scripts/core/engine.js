/**
 * @module Core
**/

var enhance = require('enhance');
var Emitter = require('emitter');
var Map = require('map');

var Entity = require('./entity');
var System = require('./system');
var EntitySet = require('./entity-set');
var SystemSet = require('./system-set');

module.exports = enhance(Object, function () {
	/**
	 * @class Engine
	 * @constructor
	**/
	this.constructor = function Engine () {
		this.entities = new EntitySet();
		this.systems = new SystemSet();
		this.families = new Map();

		this.updating = false;
	};

	/**
	 * Fired when update is complete (all systems update)
	 *
	 * @event update:complete
	**/
	Emitter(this);







	/**
	 * Add an entity or a system
	 *
	 * @method add
	 * @chainable
	 * @param {Entity|System} entityOrSystem
	 * @return {Engine}
	**/
	this.add = function add (entityOrSystem) {
		if (entityOrSystem instanceof Entity) {
			this.addEntity(entityOrSystem);
		} else if (entityOrSystem instanceof System) {
			this.addSystem(entityOrSystem);
		}

		return this;
	};

	/**
	 * Remove an entity or a system
	 *
	 * @method remove
	 * @chainable
	 * @param {Entity|System} entityOrSystem
	 * @return {Engine}
	**/
	this.remove = function remove (entityOrSystem) {
		if (entityOrSystem instanceof Entity) {
			this.removeEntity(entityOrSystem);
		} else if (entityOrSystem instanceof System) {
			this.removeSystem(entityOrSystem);
		}

		return this;
	};









	/**
	 * Add an entity
	 *
	 * @method addEntity
	 * @chainable
	 * @param {Entity} entity
	 * @return {Engine}
	**/
	this.addEntity = function addEntity (entity) {


		return this;
	};

	/**
	 * Remove an entity
	 *
	 * @method removeEntity
	 * @chainable
	 * @param {Entity} entity
	 * @return {Engine}
	**/
	this.removeEntity = function removeEntity (entity) {

		return this;
	};

	/**
	 * Remove all entities
	 *
	 * @method removeAllEntities
	 * @chainable
	 * @return {Engine}
	**/
	this.removeAllEntities = function removeAllEntities () {

		return this;
	};







	/**
	 * Add a system
	 *
	 * @method addSystem
	 * @chainable
	 * @param {System} system
	 * @param {Number} priority
	 * @return {Engine}
	**/
	this.addSystem = function addSystem (system, priority) {
		if (typeof priority === 'number') {
			system.priority = priority;
		}
		
		system.onAddedToEngine(this);
		this.systems.add(system);

		return this;
	};

	/**
	 * Remove a system
	 *
	 * @method removeSystem
	 * @chainable
	 * @param {System} system
	 * @return {Engine}
	**/
	this.removeSystem = function removeSystem (system) {

		return this;
	};

	/**
	 * Remove all systems
	 *
	 * @method removeAllSystems
	 * @chainable
	 * @return {Engine}
	**/
	this.removeAllSystems = function removeAllSystems () {

		return this;
	};














	this.update = function update (time) {
		this.updating = true;

		for (var system = this.systems.head; system; system = system.next) {
			system.update(time);
		}

		this.updating = false;
		this.emit('update:complete');
	};
});