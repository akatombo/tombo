/**
 * @module Core
**/

var Map = require('map');

var Entity = require('./entity');
var System = require('./system');

var EntitySet = require('./entity-set');
var SystemSet = require('./system-set');

module.exports = require('enhance')(Object, function () {
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
	 * Fired when 
	 *
	 * @event update:complete
	**/
	require('emitter')(this);

	/**
	 * Add a item
	 *
	 * @method add
	 * @chainable
	 * @param {Object} item
	 * @return {Set}
	**/
	this.add = function (entityOrSystem) {
		if (entityOrSystem instanceof Entity) {
			this.addEntity(entityOrSystem);
		} else if (entityOrSystem instanceof System) {
			this.addSystem(entityOrSystem);
		}
	};

	this.addEntity = function (entity) {
		this.entities.add(entity);
		// ...
		entity.on('component:added', function (component) {

		});
	};

	this.addSystem = function (system, priority) {
		system.priority = priority ? priority : system.priority;
		system.onAddedToEngine(this);
		this.systems.add(system);
	};


	this.remove = function () {

	};

	this.update = function (time) {
		this.updating = true;

		for (var system = this.systems.head; system; system = system.next) {
			system.update(time);
		}

		this.updating = false;
		this.emit('update:complete');
	};
});