should = require 'chai' .should!
{ Node, Component } = require '../../build/'

console.log Component.enhance

Position = Component.enhance!
Life = Component.enhance!

describe 'Node' (...) !->
	describe '.from(schema)' (...) !->
		it "should return a node constructor with predefined schema" !->
			PositionLifeNode = Node.from do
				position: Position
				life: Life

			node = new PositionLifeNode!

			node.$constructors.position.should.be.equal Position
			node.$constructors.life.should.be.equal Life