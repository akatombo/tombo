/** @module tombo/family **/

import PrototypelessObject from 'prototypeless-object';

export default Family;

/**
 * @class
 * @param {Object} schema
**/
function Family (schema) {
	/**
	 * @type {Map}
	**/
	// entity | node
	this.entities = new Map();

	/**
	 * @private
	 * @type {Map}
	**/
	// component constructor | property name
	this.components = new Map();


	/*
	this.pool = new Pool();
	*/

	for (let componentName in schema) {
		this.components.set(schema[componentName], componentName);
	}

	//TODO: throw error when schema is empty
}

/**
 * @method
 * @param {Entity} entity
 * @return {Family}
**/
Family.prototype.add = function add (entity) {
	if (!this.entities.has(entity) && this.match(entity)) {
		// TODO: use pooling for nodes (concept: https://gist.github.com/wryk/9483867)
		// var node = this.pool.acquire();

		let node = new PrototypelessObject();
		for (let [componentConstructor, componentName] of this.components) {
			node[componentName] = entity.get(componentConstructor);
		}

		entity.on('component:removed', onComponentRemovedFromEntity, this);
		this.entities.set(entity, node);
	}
	
	return this;
};

/**
 * @method
 * @param {Entity} entity
 * @return {Family}
**/
Family.prototype.remove = function remove (entity) {
	if (this.entities.has(entity)) {
		entity.off('component:removed', onComponentRemovedFromEntity, this);

		// TODO: use pooling for nodes
		// this.pool.release(this.entities.get(entity));
		
		this.entities.delete(entity);
	}

	return this;
};

/**
 * @method
 * @param {Entity} entity
 * @return {Boolean}
**/
Family.prototype.has = function has (entity) {
	return this.entities.has(entity);
};

/**
 * @method
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


/**
 * @function
 * @param {Entity} entity
 * @param {Component} component
 * @param {Function} componentConstructor
**/
function onComponentRemovedFromEntity (entity, component, componentConstructor) {
	if (this.entities.has(entity) && this.components.has(componentConstructor)) {
		this.remove(entity);
	}
}
