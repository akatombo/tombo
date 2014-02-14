require 'mocha'
require 'chai' .should!

mocha.setup 'bdd'

for __ in <[entity]>
	require "./#{__}"

mocha.run!