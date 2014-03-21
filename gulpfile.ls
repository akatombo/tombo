require! 'gulp'
globalize!

{ name, version } = require './component.json'

task 'default' ->
	...

task 'build' ->
	# TODO: find module can minify es6
	from './component.json'
		.pipe (require 'gulp-component') standalone: name
		.pipe (require 'gulp-rename') (!-> it.basename = name)
		.pipe (require 'gulp-prepend') "/* #{name} - v#{version} */\n"
		.pipe to './build/'

task 'development' (done) !->
	require! 'express'
	root = (require 'path').join process.cwd!, '/test'

	server = express!
		..use express.static root
		..use '/' (require 'component-serve') {+require, +dev, root}
		..listen 3000

task 'lint' ->
	...
	from 'tombo/**/*.js'
		.pipe (require 'gulp-jshint')!



function globalize
	for [name, alias] in [ <[task]> <[watch]> <[src from]> <[dest to]> ]
		global[alias || name] = gulp[name]bind gulp