should = require 'chai' .should!
{ Entity } = require '../build/'


Heroe = Component.enhance!
Sister = Component.enhance!
Koyomi = Component.enhance!

describe 'new Entity()' !->
	entity = new Entity!

	describe '#add(componentConstructor, component)' (...) !->
		it "should emit component:added event with componentConstructor and component" !->
			heroe = new Heroe!

			entity.once 'component:added' (componentConstructor, component) ->
				componentConstructor.should.be.equal Heroe
   				component.should.be.equal heroe

   			entity.add Heroe, heroe

   		it "should return this" !->
			entity.add Heroe, new Heroe! .should.be.equal entity

	describe '#remove(componentConstructor)' (...) !->
        defined-component = entity.get Heroe
        var removed-component
        var returned-component
        
		it "should emit component:remove event with componentConstructor" !->
			entity.once 'component:remove' (component-constructor, component) ->
				componentConstructor.should.be.equal Heroe
				component.should.be.equal defined-component
				
				removed-component := component

			returned-component := entity.remove Heroe

		it "should return removed component" !->
		    returned-component.should.be.equal removed-component

	describe '#has(componentConstructor)' (...) !->
		sister = new Sister!
		entity.add Sister, sister
		it "should return true" !->
			entity.has Sister .should.be.true

		it "should return false" !->
			entity.has Heroe .should.be.false

	describe '#get(componentConstructor)' (...) !->
		koyomi = new Koyomi
		entity.add Koyomi, koyomi
		it "should return compoment is defined"
			entity.get Koyomi .should.be.equal koyomi

	describe '#getAll()' (...) !->
		koyomi = new Koyomi
		sister = new Sister
		heroe = new Heroe
		entity.add Koyomi, koyomi
		entity.add Sister, sister
		entity.add Heroe, heroe
		it "should return array of all compoment "
			array = entity.getAll! 
			array .should.be.include koyomi
			array .should.be.include sister
			array .should.be.include heroe
