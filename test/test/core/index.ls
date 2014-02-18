core = require 'tombo' .core

describe 'core' (...) !->
	it 'should be requirable (require "tombo/core")' !->
		core.should.be.equal require 'tombo/core'

	it 'all core modules should be requirable (tombo.core.Component is require "tombo/core/component")' !->
		for own module-name, module of core
			module.should.be.equal require "tombo/core/#{module-name.to-lower-case!}"
	

	require './family'
	require './entity'
	require './system'