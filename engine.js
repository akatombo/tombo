import inherit from 'inherit';
import Emitter from 'emitter';
import Set from 'set';
import Map from 'map';

import Family from './family.js';
import Entity from './entity.js';
import System from './system.js';

/**
 * @module tombo
**/
export default Engine;

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
	// key:systemConstructor{function}, value:system{object}
	this.systems = new Map();

	/**
	 * @property families
	 * @private
	 * @type {Map}
	 * @default new Map()
	**/
	// key:systemConstructor{function}, value:family{object}
	this.families = new Map();
}

/**
 * @event update:start
**/

/**
 * @event update:complete
**/
inherit(Engine, Emitter);

/**
 * @method update
 * @chainable
 * @param {Number} deltaTime
 * @return {Engine}
**/
Engine.prototype.update = function update (deltaTime) {
	var family;
	this.updating = true;
	this.emit('update:start');

	var keys = this.systems.keys;
	var values = this.systems.values;
	for (var i = -1, l = keys.length; ++i < l;) {
		family = this.families.get(keys[i]);
		values[i].update(deltaTime, family.entities.values, family.entities, this);
	}

	this.updating = false;
	this.emit('update:complete');

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

	var values = this.families.values;
	for (var i = -1, l = values.length; ++i < l;) {
		values[i].add(entity);
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

	var values = this.families.values;
	for (var i = -1, l = values.length; ++i < l;) {
		values[i].remove(entity);
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
	var values = this.entities.values;
	for (var i = -1, l = values.length; ++i < l;) {
		this.removeEntity(values[i]);
	}

	return this;
};

/**
 * @method addSystem
 * @chainable
 * @param {System} system
 * @return {Engine}
**/
Engine.prototype.addSystem = function addSystem (system) {
	var systemConstructor = system.constructor;

	// TODO : use only one family for systems with same dependencies

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
	var keys = this.systems.keys;
	for (var i = -1, l = keys.length; ++i < l;) {
		this.removeSystem(keys[i]);
	}

	return this;
};

function onComponentAddedToEntity (entity, component, componentConstructor) {
	var values = this.families.values;
	for (var i = -1, l = values.length; ++i < l;) {
		values[i].add(entity);
	}
}
