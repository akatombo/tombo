should = require 'chai' .should!
{ Component } = require '../../build/'

describe 'new Componant(object)' (...) !->
	it "should mix `object` properties in component instance" !->
		component = new Component do
			'life': 100
			'mana': 200

		component.life.should.be.equal 100
		component.mana.should.be.equal 200