var inherit = require('inherit');
var Emitter = require('emitter');

var Entity = require('./entity');
var System = require('./system');
var Family = require('./family');

/**
 * @module core
**/
module.exports = Engine;

function Engine () {
	this.updating = false;

	this.entities = new Set();
	this.systems = new Map();
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
 *
 * @method run
 * @chainable
 * @param {Number} delta-time
 * @return {Engine}
**/
Engine.prototype.run = function run (deltaTime) {
	this.updating = true;
	this.emit('run:start');

	for (var [systemConstructor, system] of this.systems) {
		system.run(deltaTime, this.families.get(systemConstructor));
	}

	this.updating = false;
	this.emit('run:complete');

	return this;
};





/**
 * Add an entity or a system
 *
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
 * Remove an entity or a system
 *
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
 * Add an entity
 *
 * @method addEntity
 * @chainable
 * @param {Entity} entity
 * @return {Engine}
**/
Engine.prototype.addEntity = function addEntity (entity) {
	entity.on('component:added', this.onComponentAddedToEntity);

	for (var [systemConstructor, family] of this.families) {
		family.add(entity);
	}

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
Engine.prototype.removeEntity = function removeEntity (entity) {
	entity.off('component:added', this.onComponentAddedToEntity);

	for (var [systemConstructor, family] of this.families) {
		family.remove(entity);
	}

	this.entities.delete(entity);

	return this;
};


Engine.prototype.removeAllEntities = function removeAllEntities () {
	// FIX ME: LET keyword bug on FF
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

	system.whenAddedToEngine(this);
	this.systems.set(systemConstructor, {
		system: system,
		family: new Family(system.require)
	});

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
Engine.prototype.removeSystem = function removeSystem (systemConstructor) {
	this.systems.delete(systemConstructor);
	system.whenRemovedFromEngine(this);

	return this;
};


Engine.prototype.removeAllSystems = function removeAllSystems () {
	for (var [systemConstructor, system] of this.systems) {
		this.removeSystem(systemConstructor);
	}

	return this;
};