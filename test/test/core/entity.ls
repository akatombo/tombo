Entity = require 'tombo/core/entity'
Position = require '../../source/components/position'

position-a = new Position 5, 7
position-b = new Position 3, 1

describe 'Entity' !->
	var tree

	before-each !->
		tree := new Entity!



	describe '#add component' (...) !->
		it 'should add or overwrite a component' !->
			tree.has Position .should.be.false

			tree.add position-a
			tree.has Position .should.be.true
			tree.get Position .should.be.equal position-a

			tree.add position-b
			tree.has Position .should.be.true
			tree.get Position .should.be.equal position-b

		it 'should emit `component:added` event with (entity, component, component-constructor)' !->
			tree.once 'component:added' (entity, component, component-constructor) !->
				entity.should.be.equal tree
				component.should.be.equal position-a
				component-constructor.should.be.equal Position

			tree.add position-a

		it 'is chainable' !->
			tree.add position-a .should.be.equal tree



	describe '#remove component-constructor' (...) !->
		it 'should remove a component' !->
			tree.add position-a
			tree.has Position .should.be.true

			tree.remove Position
			tree.has Position .should.be.false	

		it 'should emit `component:removed` event with (entity, component, component-constructor)' !->
			tree.add position-a

			tree.once 'component:removed' (entity, component, component-constructor) !->
				entity.should.be.equal tree
				component.should.be.equal position-a
				component-constructor.should.be.equal Position

			tree.remove Position

		it 'is chainable' !->
			tree.remove Position .should.be.equal tree



	describe '#has component-constructor' (...) !->
		it 'should return true with defined component-constructorr' !->
			tree.add position-a
			tree.has Position .should.be.true

		it 'should return false with undefined component-constructor' !->
			tree.has Position .should.be.false



	describe '#get component-constructor' (...) !->
		it 'should return component' !->
			tree.add position-a
			tree.get Position .should.be.equal position-a