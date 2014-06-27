import Family from 'tombo/family.js';
import Entity from 'tombo/entity.js';

import Position from '../fixtures/components/position.js';
import Health from '../fixtures/components/health.js';

var position = new Position(3, 1);
var health = new Health(200, 80);

describe("Family", function () {
	var family;
	var entity;

	beforeEach(function () {
		family = new Family({
			position: Position,
			health: Health
		});

		entity = new Entity();
	});

	describe("#add(entity)", function () {
		it("should add `entity` when `entity` match with family components", function () {
			entity
				.add(position)
				.add(health)
			;

			family.has(entity).should.be.false;
			family.add(entity);
			family.has(entity).should.be.true;
		});

		it("shouldn't add `entity` when `entity` don't match with family components", function () {
			entity.add(position);

			family.add(entity);
			family.has(entity).should.be.false;
		});

		it("should be chainable", function () {
			family.add(entity).should.be.equal(family);
		});
	});

	describe("#remove(entity)", function () {
		it("should remove `entity`", function () {
			entity
				.add(position)
				.add(health)
			;

			family.add(entity);
			family.has(entity).should.be.true;
			family.remove(entity);
			family.has(entity).should.be.false;
		});

		it("should be chainable", function () {
			family.remove(entity).should.be.equal(family);
		});
	});

	describe("#has(entity)", function () {
		it("should return true when family has `entity`", function () {
			entity
				.add(position)
				.add(health)
			;

			family.add(entity);
			family.has(entity).should.be.true;
		});

		it("should return false when family has not `entity`", function () {
			family.has(entity).should.be.false;
		});
	});

	describe("#match(entity)", function () {
		it("should return true when `entity` has all required components", function () {
			entity
				.add(position)
				.add(health)
			;

			family.add(entity);
			family.match(entity).should.be.true;
		});

		it("should return false when `entity` has not all required components", function () {
			entity
				.add(position)
			;

			family.match(entity).should.be.false;
		});
	});
});