var Family = require('tombo/family');
var Entity = require('tombo/entity');

var Position = require('fixtures/components/position');
var Health = require('fixtures/components/health');

var position = new Position(3, 1);
var health = new Health(200, 80);

describe('Family', function () {
	var family;
	var entity;

	beforeEach(function () {
		family = new Family({
			position: Position,
			health: Health
		});

		entity = new Entity();
	});


	describe('#add(entity)', function () {
		it('should add entity if match', function () {
			entity
				.add(position)
				.add(health)
			;

			family.has(entity).should.be.false;
			family.add(entity);
			family.has(entity).should.be.true;
		});

		it('should not add entity if not match', function () {
			entity.add(position);

			family.add(entity);
			family.has(entity).should.be.false;
		});

		it('should be chainable', function () {
			family.add(entity).should.be.equal(family);
		});
	});


	describe('#remove(entity)', function () {
		it('should remove entity', function () {
			entity
				.add(position)
				.add(health)
			;

			family.add(entity);
			family.has(entity).should.be.true;
			family.remove(entity);
			family.has(entity).should.be.false;
		});

		it('should be chainable', function () {
			family.remove(entity).should.be.equal(family);
		});
	});


	describe('#has(entity)', function () {
		it('should return true', function () {
			entity
				.add(position)
				.add(health)
			;

			family.add(entity);
			family.has(entity).should.be.true;
		});

		it('should return false', function () {
			family.has(entity).should.be.false;
		});
	});


	describe('#match(entity)', function () {
		it('should return true if `entity` has all required components', function () {
			entity
				.add(position)
				.add(health)
			;

			family.add(entity);
			family.match(entity).should.be.true;
		});

		it('should return false if `entity` has not all required components', function () {
			entity
				.add(position)
			;

			family.match(entity).should.be.false;
		});
	});
});