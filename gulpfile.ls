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
destination = if production then '.' else './build/'

banner = "/* #{name} - v#{version} */\n"

options = standalone: name

filename = (dirname, basename, extension) -> "#{name}#{extension}"
minified-filename = (dirname, basename, extension) -> "#{name}.min#{extension}"





task 'default' ->
	console.log 'default task'


task 'build' ->
	from root
		.pipe component options
		.pipe prepend banner
		.pipe rename filename
		.pipe to destination

	if production
		from root
			.pipe component options
			.pipe minify!
			.pipe prepend banner
			.pipe rename minified-filename
			.pipe to destination


task 'lint' ->
	from scripts
		.pipe lint!
		.pipe lint.reporter 'default'


task 'watch' ->
	...