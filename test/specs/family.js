import Family from 'tombo/family.js';
import Entity from 'tombo/entity.js';

// import Position from 'game-of-life/component/position.js';
import State from 'game-of-life/component/state.js';

var position = new Position(0, 0);
var state = new State(State.ALIVE);

describe("Family", function () {
	var family;
	var entity;

	beforeEach(function () {
		family = new Family({
			position: Position,
			state: State
		});

		entity = new Entity();
	});

	describe("#add(entity)", function () {
		it("should add `entity` when `entity` match with family components", function () {
			entity
				.add(position)
				.add(state)
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
				.add(state)
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
				.add(state)
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
				.add(state)
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