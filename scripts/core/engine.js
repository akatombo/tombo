/* jshint -W079 */
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
		this.onComponentAddedToEntity = this.onComponentAddedToEntity.bind(this);
	};

	/**
	 * Fired when update start
	 *
	 * @event update:start
	**/

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
		entity.on('component:added', this.onComponentAddedToEntity);

		this.families.forEach(function (family) {
			family.newEntity(entity);
		});

		this.entities.add(entity);

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
		entity.off('component:added', this.onComponentAddedToEntity);

		this.families.forEach(function (family) {
			family.removeEntity(entity);
		});

		this.entities.remove(entity);
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
		while (this.entities.head) {
			this.removeEntity(this.entities.head);
		}

		return this;
	};

	/**
	 * Get entity
	 *
	 * @method getEntity
	 * @param {Function} systemConstructor
	 * @return {System|null}
	**/
	this.getEntity = function getEntity (uidOrEntity) {
		return this.entities.get(uidOrEntity);
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
		this.systems.remove(system);
		system.onRemoveFromEngine(this);

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
		while (this.systems.head) {
			this.removeSystem(this.systems.head);
		}

		return this;
	};

	/**
	 * Get system
	 *
	 * @method getSystem
	 * @param {Function} systemConstructor
	 * @return {System|null}
	**/
	this.getSystem = function getSystem (systemConstructor) {
		return this.systems.get(systemConstructor);
	};







	this.onComponentAddedToEntity = function onComponentAddedToEntity () {

	};




	/**
	 * Remove all systems
	 *
	 * @method removeAllSystems
	 * @chainable
	 * @return {Engine}
	**/
	this.update = function update (time) {
		this.updating = true;
		this.emit('update:start');

		for (var system = this.systems.head; system; system = system.next) {
			system.update(time);
		}

		this.updating = false;
		this.emit('update:complete');
	};
});