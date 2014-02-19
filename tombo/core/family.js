/**
 * @module core
**/
module.exports = Family;

/**
 * @class Family
 * @constructor
 * @param {Object} schema
**/
function Family (schema) {
	/**
	 * @property entities
	 * @private
	 * @type {Map}
	 * @default new Map()
	**/
	// KEY: entity instance | VALUE: entity node
	this.entities = new Map();

	/**
	 * @property components
	 * @private
	 * @type {Map}
	 * @default new Map()
	**/
	// KEY: component constructor | VALUE: component link name
	this.components = new Map();

	for (var componentName in schema) {
		this.components.set(schema[componentName], componentName);
	}

	//TODO: throw error when schema is empty
}

/**
 * 
 *
 * @method add
 * @chainable
 * @param {Entity} entity
 * @return {Family}
**/
Family.prototype.add = function add (entity) {
	if (!this.entities.has(entity) && this.match(entity)) {

		var node = {};
		for (var [componentConstructor, componentName] of this.components) {
			node[componentName] = entity.get(componentConstructor);
		}

		entity.on('component:removed', onComponentRemovedFromEntity, this);
		this.entities.set(entity, node); 
	}
	
	return this;
};

/**
 * 
 *
 * @method remove
 * @chainable
 * @param {Entity} entity
 * @return {Family}
**/
Family.prototype.remove = function remove (entity) {
	if (this.entities.has(entity)) {
		entity.off('component:removed', onComponentRemovedFromEntity, this);
		this.entities.delete(entity);
	}

	return this;
};

/**
 * 
 *
 * @method has
 * @param {Entity} entity
 * @return {Boolean}
**/
Family.prototype.has = function has (entity) {
	return this.entities.has(entity);
};

/**
 * 
 *
 * @method match
 * @param {Entity} entity
 * @return {Boolean}
**/
Family.prototype.match = function (entity) {
	for (var [componentConstructor, componentName] of this.components) {
		if (!entity.has(componentConstructor)) {
			return false;
		}
	}

	return true;
};

/**
 * 
 *
 * @method check
 * @param {Entity} entity
 * @param {Component} component
 * @param {Function} componentConstructor
 * @return {}
**/
function onComponentRemovedFromEntity (entity, component, componentConstructor) {
	if (this.entities.has(entity) && this.components.has(componentConstructor)) {
		this.remove(entity);
	}
}