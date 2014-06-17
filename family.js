import PrototypelessObject from 'prototypeless-object';
import Map from 'map';

/**
 * @module tombo
**/
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
	// key:entity{object}, value:node{object}
	this.entities = new Map();

	/**
	 * @property components
	 * @private
	 * @type {Map}
	 * @default new Map()
	**/
	// key:componentConstructor{function}, value:componentName{string}
	this.components = new Map();


	/*
	this.pool = new Pool();
	*/
	var componentName;
	var keys = Object.keys(schema);
	for (var i = -1, l = keys.length; ++i < l;) {
		componentName = keys[i];
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

		// TODO: use pooling for nodes (concept: https://gist.github.com/wryk/9483867)
		// var node = this.pool.acquire();
		
		var node = new PrototypelessObject();

		var keys = this.components.keys;
		var values = this.components.values;
		for (var i = -1, l = keys.length; ++i < l;) {
			node[values[i]] = entity.get(keys[i]);
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

		// TODO: use pooling for nodes
		// this.pool.release(this.entities.get(entity));
		
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
	var keys = this.components.keys;
	for (var i = -1, l = keys.length; ++i < l;) {
		if (!entity.has(keys[i])) {
			return false;
		}
	}

	return true;
};

function onComponentRemovedFromEntity (entity, component, componentConstructor) {
	if (this.components.has(componentConstructor) && this.entities.has(entity)) {
		this.remove(entity);
	}
}
