{ Entity, Component } = require 'tombo'

class Position extends Component
class Heroe extends Component
class Life extends Component

position = new Position!
heroe = new Heroe!
life = new Life!

describe 'new Entity()' !->
	entity = new Entity!
	entity.add new Position!

	describe '#add(component)' (...) !->
		it "should add or overwrite an component entry" !->
			heroe2 = new Heroe!
			entity.add heroe2
			entity.get Heroe .should.be.equal heroe2

			entity.add heroe
			entity.get Heroe .should.be.equal heroe


		it "should emit component:added event with component and componentConstructor" !->
			entity.once 'component:added' (entity, component, component-constructor) ->
				component.should.be.equal heroe
				component-constructor.should.be.equal Heroe

			entity.add heroe


		it "is chainable" !->
			entity.add heroe .should.be.equal entity

	describe '#remove(componentConstructor)' (...) !->
		it "should emit component:remove event with component and componentConstructor" !->
			entity.once 'component:remove' (entity, component, component-constructor) ->
				component.should.be.equal life
				component-constructor.should.be.equal Life
				
			entity.add life
			entity.remove Life

		it "should return removed component or false is component doesn't exist" !->
			entity.add life
			entity.remove Life .should.be.equal life
			entity.remove Life .should.be.false

	describe '#has(componentConstructor)' (...) !->
		it "should return true with defined component-constructor" !->
			entity.has Position .should.be.true

		it "should return false with undefined component-constructor" !->
			entity.has Life .should.be.false

	describe '#get(componentConstructor)' (...) !->
		it "should return component is defined" !->
			entity.add life
			entity.get Life .should.be.equal life


	# describe '#getAll()' (...) !->
	# 	it "should return an array of all component" !->
	# 		all-components = entity.getAll!

	# 		all-components.forEach (component) !->
	# 			entity.has component.constructor .should.be.true
