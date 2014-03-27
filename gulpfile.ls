globalize require 'gulp'

require! {
	component: 'gulp-component'
	documentation: 'gulp-yuidoc'
	lint: 'gulp-jshint'
	prepend: 'gulp-header'
	rename: 'gulp-rename'
	symlink: 'gulp-symlink'

	coverage: 'component-jscoverage'
	serve: 'component-serve'

	stylish: 'jshint-stylish'
}

{name, repo, description, license, version} = require './component.json'

task 'default' <[build]>

task 'build' ->
	# TODO: find module can minify es6
	from 'component.json'
		.pipe component standalone: name
		.pipe rename (!-> it.basename = name)
		.pipe prepend "/* #{name} - v#{version} (#{license}) */\n"
		.pipe to 'build'

task 'development' <[symlink documentation lint]> (done) !->
	require! 'express'

	watch '*.js' <[documenation lint]>

	root = require 'path' .join __dirname, 'test'
	server = express!
		..use express.static root
		..use '/' serve {root, +dev, +require /*, plugins: [coverage] */}
		..listen 3000 -> done console.log "development server running on port 3000"

task 'documentation' ->
	from '*.js'
		.pipe documentation.parser {}
		.pipe documentation.reporter!
		.pipe documentation.generator {name, version}
		.pipe to 'documentation'

task 'lint' ->
	from '*.js'
		.pipe lint {
			+camelcase
			+curly
			+eqeqeq
			+esnext
			+expr
			+freeze
			+funcscope
			+newcap
			+trailing
			+undef
		} <<< do
			indent: 4
			unused: 'vars'
			globals: {+module, +exports, +require}

		.pipe lint.reporter stylish

task 'symlink' ->



function log
	console.log it

function globalize
	for [name, alias] in [ <[task]> <[watch]> <[src from]> <[dest to]> ]
		global[alias || name] = it[name]bind it