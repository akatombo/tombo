require! {
	Emitter: 'emitter'
	Map: 'map'
}

/**
 * @class Entity
 * @constructor
**/
class Entity extends Emitter
	!->
		/**
		 * Contains all components attached to the entity
		 *
		 * @private
		 * @property _components
		 * @type {Map}
		 * @default new Map()
		**/
		@_components = new Map!



	/**
	 * Fired when a component is added
	 *
	 * @event component:added
	 * @param {Function} componentConstructor Constructor of the added component
	 * @param {Component} componentInstance The added component
	**/

	/**
	 * Fired when a component is removed
	 *
	 * @event component:removed
	 * @param {Function} componentConstructor Constructor of the removed component
	 * @param {Component} componentInstance The removed component
	**/



	/**
	 * Add a component, fire component:added event
	 *
	 * @method add
	 * @chainable
	 * @param {Function} componentConstructor
	 * @param {Component} componentInstance
	 * @return {Entity}
	**/
	add: (component-constructor, component-instance) ->
		@_components.set component-constructor, component-instance
		@emit 'component:added' component-constructor, component-instance
		
		@


	/**
	 * Remove a component with his constructor, fire component:removed event
	 *
	 * @method remove
	 * @param {Function} componentConstructor
	 * @return {Component|null}
	**/
	remove: (component-constructor, component-instance) ->
		component-instance = @_components.get component-constructor

		if component-instance
			@_components.delete component-constructor
			@emit 'component:removed' component-constructor, component-instance

		component-instance


	/**
	 * 
	 *
	 * @method has
	 * @param {Function} componentConstructor
	 * @return {Boolean}
	**/
	has: (component-constructor) ->
		@_components.has component-constructor


	/**
	 * Get an attached component with his constructor
	 *
	 * @method get
	 * @param {Function} componentConstructor
	 * @return {Component|null}
	**/
	get: (component-constructor) ->
		@_components.get component-constructor





module.exports = Entity