/* jshint -W079 */
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

	this.onRemoveEntity = function onRemoveEntity (entity) {
		this.removeIfMatch(entity);
	};

	this.onComponentAddedToEntity = function onComponentAddedToEntity (entity /*, componentConstructor */) {
		this.addIfMatch(entity);
	};

	this.onComponentRemovedFromEntity = function onComponentRemovedFromEntity (entity, componentConstructor) {
		if (this.components.has(componentConstructor)) {
			this.removeIfMatch(entity);
		}
	};





	this.addIfMatch = function addIfMatch (entity) {
		if (!this.entities.has(entity)) {
			var iterator;
			var entry;
			var componentConstructor;

			iterator = this.components.keys();
			while ((componentConstructor = iterator.next())) {
				if (!entity.has(componentConstructor)) {
					return;
				}
			}

			var node = this.pool.acquire();
			node.entity = entity;

			iterator = this.components.entries();
			while ((entry = iterator.next())) {
				node[entry[0]] = entity.get(entry[1]);
			}

			this.entities.set(entity, node);
			// TODO : manage context in emitter
			entity.on('component:removed', this.onComponentRemovedFromEntity.bind(this));
			this.nodes.add(node);
		}
	};




	this.removeIfMatch = function removeIfMatch (entity) {
		if (this.entities.has(entity)) {
			var node = this.entities.get(entity);
			entity.off('component:removed', this.onComponentRemovedFromEntity);
			this.entities.delete(entity);
			this.nodes.delete(node);

			// TODO : add pool cache management
			if (this.engine.updating) {

			} else {

			}
		}
	};

});