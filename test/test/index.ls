tombo = require 'tombo'

describe 'tombo' (...) !->
	it 'should alias all core modules (`tombo.Component` is `tombo.core.Component`)' !->
		for own module-name, module of tombo.core
			tombo[module-name].should.be.equal module


	require './core/'