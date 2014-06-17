{Component, Engine, Entity, System} = require 'tombo'

# COMPONENTS
class Position extends Component
	(@x, @y) !->


class Sprite extends Component
	(@image) !->


# SYSTEMS
class Render extends System
	(@canvas) !->
		@context = @canvas.get-context '2d'

	require:
		position: Position
		sprite: Sprite

	# do something and display that fucking sprite at the right position
	# in the RenderSystem case, delta-time is useless :)
	run: (delta-time, nodes, entities, engine) !->
		@context.clearRect 0, 0, @canvas.width, @canvas.height

		for {sprite: {image}, position: {x, y}} in nodes
			@context.draw-image image, x, y


# glue them all !
canvas = ... # canvas object
hatsune-miku-sprite = ... # image object

game = new Engine! # create a new game engine

hatsune-miku = new Entity! # initialize a new entity
hastune-miku # add some components
	.add new Position 10 30
	.add new Sprite hastune-miku-sprite

engine.add new Render canvas # add render system
engine.add hastune-miku # add hatsune entity to engine
engine.run! # put this method in an animationFrame and envoy your e/s game loop