var inherit = require('inherit');
var Emitter = require('emitter');

var Family = require('./family');
var Entity = require('./entity');
var System = require('./system');

/**
 * @module tombo
**/
module.exports = Engine;

function onComponentAddedToEntity (entity, component, componentConstructor) {
	for (var family of this.families.values()) {
		family.add(entity);
	}
}

/**
 * @class Engine
 * @constructor
**/
function Engine () {
	/**
	 * @property updating
	 * @readonly
	 * @type {Boolean}
	 * @default false
	**/
	this.updating = false;

	/**
	 * @property entities
	 * @private
	 * @type {Set}
	 * @default new Set()
	**/
	this.entities = new Set();

	/**
	 * @property systems
	 * @private
	 * @type {Map}
	 * @default new Map()
	**/
	this.systems = new Map();

	/**
	 * @property families
	 * @private
	 * @type {Map}
	 * @default new Map()
	**/
	this.families = new Map();
}

/**
 * Fired when update start
 *
 * @event run:start
**/

/**
 * Fired when update is complete (all systems update)
 *
 * @event run:complete
**/
inherit(Engine, Emitter);

/**
 * @method run
 * @chainable
 * @param {Number} deltaTime
 * @return {Engine}
**/
Engine.prototype.run = function run (deltaTime) {
	this.updating = true;
	this.emit('run:start');

	for (var system of this.systems.values()) {
		system.run(deltaTime, this.families.entities.values());
	}

	this.updating = false;
	this.emit('run:complete');

	return this;
};

/**
 * @method add
 * @chainable
 * @param {Entity|System} entityOrSystem
 * @return {Engine}
**/
Engine.prototype.add = function add (entityOrSystem) {
	if (entityOrSystem instanceof Entity) {
		this.addEntity(entityOrSystem);
	} else if (entityOrSystem instanceof System) {
		this.addSystem(entityOrSystem);
	}

	return this;
};

/**
 * @method remove
 * @chainable
 * @param {Entity|System} entityOrSystem
 * @return {Engine}
**/
Engine.prototype.remove = function remove (entityOrSystem) {
	if (entityOrSystem instanceof Entity) {
		this.removeEntity(entityOrSystem);
	} else if (entityOrSystem instanceof System) {
		this.removeSystem(entityOrSystem);
	}

	return this;
};

/**
 * @method addEntity
 * @chainable
 * @param {Entity} entity
 * @return {Engine}
**/
Engine.prototype.addEntity = function addEntity (entity) {
	entity.on('component:added', onComponentAddedToEntity, this);

	for (var family of this.families.values()) {
		family.add(entity);
	}

	this.entities.add(entity);

	return this;
};

/**
 * @method removeEntity
 * @chainable
 * @param {Entity} entity
 * @return {Engine}
**/
Engine.prototype.removeEntity = function removeEntity (entity) {
	entity.off('component:added', onComponentAddedToEntity, this);

	for (var family of this.families.values()) {
		family.remove(entity);
	}

	this.entities.delete(entity);

	return this;
};

/**
 * @method removeAllEntities
 * @chainable
 * @return {Engine}
**/
Engine.prototype.removeAllEntities = function removeAllEntities () {
	for (var entity of this.entities) {
		this.removeEntity(entity);
	}

	return this;
};

/**
 * Add a system
 *
 * @method addSystem
 * @chainable
 * @param {System} system
 * @return {Engine}
**/
Engine.prototype.addSystem = function addSystem (system) {
	var systemConstructor = system.constructor;

	this.systems.set(systemConstructor, system);
	this.families.set(systemConstructor, new Family(system.require));

	return this;
};

/**
 * @method removeSystem
 * @chainable
 * @param {System} system
 * @return {Engine}
**/
Engine.prototype.removeSystem = function removeSystem (systemConstructor) {
	this.systems.delete(systemConstructor);
	this.families.delete(systemConstructor);

	return this;
};

/**
 * @method removeAllSystems
 * @chainable
 * @return {Engine}
**/
Engine.prototype.removeAllSystems = function removeAllSystems () {
	for (var systemConstructor of this.systems.keys()) {
		this.removeSystem(systemConstructor);
	}

	return this;
};