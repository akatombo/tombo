require! {
	g: 'gulp'

	prepend: 'gulp-header'
	rename: 'gulp-rename'

	component: 'gulp-component'
	lint: 'gulp-jshint'
	minify: 'gulp-uglify'

	configuration: './component.json'
}


for [name, alias] in [ <[task]> <[run]> <[watch]> <[src from]> <[dest to]> ]
	global[alias || name] = g[name]bind g

{ name, version } = configuration
{ production } = g.env





root = './component.json'
scripts = './scripts/**/*.js'
banner = "/* #{name} - v#{version} */\n"


task 'default' ->
	console.log 'default task'


task 'build' ->
	folder = './build/'
	options = {}

	if production
		folder = '.'
		options.standalone = name

		from root
			.pipe component options
			.pipe minify!
			.pipe prepend banner
			.pipe rename (dirname, basename, extension) -> "#{name}.min#{extension}"
			.pipe to folder

	from root
		.pipe component options
		.pipe prepend banner
		.pipe rename (dirname, basename, extension) -> "#{name}#{extension}"
		.pipe to folder	


task 'lint' ->
	from scripts
		.pipe lint!
		.pipe lint.reporter require 'jshint-stylish'


task 'watch' ->
	run 'build'

	watch [root, scripts] !->
		run 'build'