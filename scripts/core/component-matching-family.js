/**
 * @module Core
**/

var hasOwnProperty = Object.prototype.hasOwnProperty;

var enhance = require('enhance');
var NodeSet = require('./node-set');

module.exports = enhance(Object, function () {
	this.constructor = function ComponentMatchingFamily (nodeConstructor, engine) {
		this.nodeConstructor = nodeConstructor;
		this.engine = engine;

		this.nodes = new NodeSet();
		this.entities = new Map();
		this.components = new Map();
		// this.pool = new ObjectPool(nodeConstructor);

		var prototype = nodeConstructor.prototype;
		for (var property in prototype) {
			if (hasOwnProperty.call(prototype, property) && property !== 'constructor') {
				// use set instead of map ?
				this.components.add(prototype.$constructors[property], property);
			}
		}
	};




	this.onNewEntity = function onNewEntity(entity) {
		this.addIfMatch(entity);
	};

	this.onComponentAddedToEntity = function onComponentAddedToEntity (entity) {
		this.addIfMatch(entity);
	};

	this.onComponentRemovedFromEntity = function onComponentRemovedFromEntity (entity, componentConstructor) {
		if (this.components.has(componentConstructor)) {
			this.removeIfMatch(entity);
		}
	};

	this.removeEntity = function removeEntity (entity) {
		this.removeIfMatch(entity);
	};



	this.addIfMatch = function addIfMatch (entity) {
		if (!this.entities.has(entity)) {

			if (false) {
				return;
			}

			var node = this.pool.acquire();
			node.entity = entity;

			this.entities.add(entity, node);
			entity.on('component:removed', function () {

			}, this);
		}
	};

	this.removeIfMatch = function removeIfMatch (entity) {

	};
});