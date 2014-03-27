globalize require 'gulp'

require! {
	component: 'gulp-component'
	lint: 'gulp-jshint'
	prepend: 'gulp-header'
	rename: 'gulp-rename'
	symlink: 'gulp-symlink'

	coverage: 'component-jscoverage'
	serve: 'component-serve'

}

{ name, version } = require './component.json'

task 'default' ->
	...

task 'build' ->
	# TODO: find module can minify es6
	from 'component.json'
		.pipe component standalone: name
		.pipe rename (!-> it.basename = name)
		.pipe prepend "/* #{name} - v#{version} */\n"
		.pipe to './build/'

task 'development' <[symlink]> (done) !->
	require! 'express'

	root = require 'path' .join __dirname, 'test'
	server = express!
		..use express.static root
		..use '/' serve { root, +dev, +require /*, plugins: [coverage] */ }
		..listen 3000 -> done console.log "development server running on port 3000"

task 'documentation' -> ...

task 'lint' -> ...

task 'symlink' ->



function log
	console.log it

function globalize
	for [name, alias] in [ <[task]> <[watch]> <[src from]> <[dest to]> ]
		global[alias || name] = it[name]bind it