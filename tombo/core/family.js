/**
 * @module core
**/
module.exports = Family;

/**
 * @class Family
 * @constructor
**/
function Family (schema) {
	/**
	 * 
	 *
	 * @property entities
	 * @private
	 * @type {Map}
	 * @default new Map()
	**/
	// KEY: entity instance | VALUE: entity node
	this.entities = new Map();

	/**
	 * 
	 *
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
}

/**
 * 
 *
 * @method 
 * @param {}
 * @return {}
**/
Family.prototype.add = function add (entity) {
	if (!this.entities.has(entity) && this.match(entity)) {

		var node = {};
		for (var [componentConstructor, componentName] of this.components) {
			node[componentName] = entity.get(componentConstructor);
		}

		entity.on('component:removed', this.onComponentRemoved, this);
		this.entities.set(entity, node); 
	}
	
};

/**
 * 
 *
 * @method 
 * @param {}
 * @return {}
**/
Family.prototype.remove = function remove (entity) {
	if (this.entities.has(entity)) {
		entity.off('component:removed', this.onComponentRemoved, this);
		this.entities.delete(entity);
	}
};

/**
 * 
 *
 * @method 
 * @param {}
 * @return {}
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
 * @method 
 * @param {}
 * @return {}
**/
Family.prototype.onComponentRemoved = function (entity, component, componentConstructor) {
	if (this.components.has(componentConstructor)) {
		this.remove(entity);
	}
};