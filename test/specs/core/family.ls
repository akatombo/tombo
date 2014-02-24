Family = require 'tombo/core/family'

Entity = require 'tombo/core/entity'

Position = require '../../source/components/position'
Stats = require '../../source/components/stats'


position = new Position 3, 1
stats = new Stats 200, 80


describe 'Family' (...) !->
	var family, entity

	before-each !->
		family := new Family do
			position: Position
			stats: Stats

		entity := new Entity!



	describe '#add entity' (...) !->
		it 'should add entity if match' !->
			entity
				.add position
				.add stats

			family.add entity
			family.has entity .should.be.true


		it 'should not add entity if not match' !->
			entity.add position
			family.add entity
			family.has entity .should.be.false

		it 'is chainable' !->
			family.add entity .should.be.equal family



	describe '#remove entity' (...) !->
		it 'should remove entity' !->
			entity
				.add position
				.add stats

			family.add entity
			family.remove entity
			family.has entity .should.be.false



	describe '#has entity' (...) !->
		it 'should return true' !->
			entity
				.add position
				.add stats

			family.add entity
			family.has entity .should.be.true

		it 'should return false' !->
			family.has entity .should.be.false



	describe '#match entity' (...) !->
		it 'should return true if `entity` has all required components' !->
			entity
				.add position
				.add stats

			family.match entity .should.be.true

		it 'should return false `entity` has not all required components' !->
			entity
				.add position

			family.match entity .should.be.false