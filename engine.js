/** @module engine **/

import inherit from 'inherit';
import Emitter from 'emitter';

import Family from './family.js';
import Entity from './entity.js';
import System from './system.js';

export default Engine;

/**
 * @class @extends Emitter
**/
function Engine () {
	/**
	 * @readonly
	 * @type {Boolean}
	**/
	this.updating = false;

	/**
	 * @private
	 * @type {Set}
	**/
	this.entities = new Set();

	/**
	 * @private
	 * @type {Map}
	**/
	// systemConstructor | system
	this.systems = new Map();

	/**
	 * @private
	 * @type {Map}
	**/
	// systemConstructor | family
	this.families = new Map();
}

inherit(Engine, Emitter);

/**
 * @method update
 * @chainable
 * @param {Number} deltaTime
 * @return {Engine}
**/
Engine.prototype.update = function update (deltaTime) {
	let family;
	this.updating = true;

	/**
	 * @event update:start
	**/
	this.emit('update:start');

	for (let [system, systemConstructor] of this.systems) {
		family = this.families.get(systemConstructor);
		system.update(deltaTime, family.entities.values(), family.entities, this);
	}

	this.updating = false;

	/**
	 * @event update:end
	**/
	this.emit('update:end');

	return this;
};

/**
 * @method
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
 * @method
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
 * @method
 * @param {Entity} entity
 * @return {Engine}
**/
Engine.prototype.addEntity = function addEntity (entity) {
	entity.on('component:added', onComponentAddedToEntity, this);

	for (let family of this.families.values()) {
		family.add(entity);
	}

	this.entities.add(entity);

	return this;
};

/**
 * @method
 * @param {Entity} entity
 * @return {Engine}
**/
Engine.prototype.removeEntity = function removeEntity (entity) {
	entity.off('component:added', onComponentAddedToEntity, this);

	for (let family of this.families.values()) {
		family.remove(entity);
	}

	this.entities.delete(entity);

	return this;
};

/**
 * @method
 * @return {Engine}
**/
Engine.prototype.removeAllEntities = function removeAllEntities () {
	for (let entity of this.entities) {
		this.removeEntity(entity);
	}

	return this;
};

/**
 * @method
 * @param {System} system
 * @return {Engine}
**/
Engine.prototype.addSystem = function addSystem (system) {
	var systemConstructor = system.constructor;

	// TODO : optimization: use only one family for systems with same require dependencies

	this.systems.set(systemConstructor, system);
	this.families.set(systemConstructor, new Family(system.require));

	return this;
};

/**
 * @method
 * @param {System} system
 * @return {Engine}
**/
Engine.prototype.removeSystem = function removeSystem (systemConstructor) {
	this.systems.delete(systemConstructor);
	this.families.delete(systemConstructor);

	return this;
};

/**
 * @method
 * @return {Engine}
**/
Engine.prototype.removeAllSystems = function removeAllSystems () {
	for (var systemConstructor of this.systems.keys()) {
		this.removeSystem(systemConstructor);
	}

	return this;
};

/**
 * @function
 * @param {Entity} entity
 * @param {Component} component
 * @param {Function} componentConstructor
**/
function onComponentAddedToEntity (entity, component, componentConstructor) {
	for (var family of this.families.values()) {
		family.add(entity);
	}
}
