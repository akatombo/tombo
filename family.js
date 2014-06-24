/**
 * @module tombo
**/
import PrototypelessObject from 'prototypeless-object';

export default Family;

/**
 * @class Family
 * @constructor
 * @param {Object} schema
**/
function Family (schema) {
	/**
	 * @property entities
	 * @type {Map}
	 * @default new Map()
	**/
	// entity | node
	this.entities = new Map();

	/**
	 * @property components
	 * @private
	 * @type {Map}
	 * @default new Map()
	**/
	// component constructor | property name
	this.components = new Map();


	/*
	this.pool = new Pool();
	*/

	for (var componentName in schema) {
		this.components.set(schema[componentName], componentName);
	}

	//TODO: throw error when schema is empty
}

/**
 * @method add
 * @chainable
 * @param {Entity} entity
 * @return {Family}
**/
Family.prototype.add = function add (entity) {
	if (!this.entities.has(entity) && this.match(entity)) {

		/*
		var node = this.pool.acquire();
		*/

		// TODO: use pooling for nodes (concept: https://gist.github.com/wryk/9483867)
		// TODO: use prototypeless object for node (https://gist.github.com/wryk/9483931)
		var node = new PrototypelessObject();
		for (var [componentConstructor, componentName] of this.components) {
			node[componentName] = entity.get(componentConstructor);
		}

		entity.on('component:removed', onComponentRemovedFromEntity, this);
		this.entities.set(entity, node);
	}
	
	return this;
};

/**
 * @method remove
 * @chainable
 * @param {Entity} entity
 * @return {Family}
**/
Family.prototype.remove = function remove (entity) {
	if (this.entities.has(entity)) {
		entity.off('component:removed', onComponentRemovedFromEntity, this);

		/*
		this.pool.release(this.entities.get(entity));
		*/

		// TODO: use pooling for nodes
		this.entities.delete(entity);
	}

	return this;
};

/**
 * @method has
 * @param {Entity} entity
 * @return {Boolean}
**/
Family.prototype.has = function has (entity) {
	return this.entities.has(entity);
};

/**
 * @method match
 * @param {Entity} entity
 * @return {Boolean}
**/
Family.prototype.match = function (entity) {
	for (var componentConstructor of this.components.keys()) {
		if (!entity.has(componentConstructor)) {
			return false;
		}
	}

	return true;
};

function onComponentRemovedFromEntity (entity, component, componentConstructor) {
	if (this.entities.has(entity) && this.components.has(componentConstructor)) {
		this.remove(entity);
	}
}
