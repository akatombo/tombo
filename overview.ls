{ Component, Engine, Entity, System } = require 'tombo'

# or -take a look at component(1)-

Component = require 'tombo/component'
Engine = require 'tombo/engine'
Entity = require 'tombo/entity'
System = require 'tombo/system'

class Position extends Component
	(@x, @y) !->

class Sprite extends Component
	(@image) !->

class Render extends System
	(@canvas) !->
		@context = @canvas.get-context '2d'

	require:
		position: Position
		sprite: Sprite

	# do something and display that fucking sprite at the right position
	# in the RenderSystem case, delta-time is useless :)
	run: (delta-time, entities) !->
		@context.clearRect 0, 0, @canvas.width, @canvas.height

		for entity in entities
			@context.draw-image entity.sprite.image, entity.position.x, entity.position.y







canvas-2d-context = ... # canvas like object
hatsune-miku-sprite = ... # preload image

game = new Engine! # create a new game engine

hatsune-miku = new Entity! # initialize a new entity
hastune-miku # add some components to entity
	.add new Position 10 30
	.add new Sprite hastune-miku-sprite

engine.add new Render canvas # add render system
engine.add hastune-miku # add hatsune entity to engine
engine.run! # put this method in an animationFrame and envoy your e/s game loop