import Entity from 'tombo/entity.js';
import Position from '../fixtures/components/position.js';

var positionA = new Position(5, 7);
var positionB = new Position(3, 1);

describe("Entity", function () {
	var tree;

	beforeEach(function () {
		tree = new Entity();
	});

	describe("#add(component)", function () {
		it("should add `component`", function () {
			tree.has(Position).should.be.false;

			tree.add(positionA);
			tree.has(Position).should.be.true;
			tree.get(Position).should.be.equal(positionA);
		});

		it("should overwrite with `component`", function () {
			tree.has(Position).should.be.false;

			tree.add(positionA);
			tree.has(Position).should.be.true;
			tree.get(Position).should.be.equal(positionA);

			tree.add(positionB);
			tree.has(Position).should.be.true;
			tree.get(Position).should.be.equal(positionB);
		});

		it("should emit `component:added` event with (entity, component, componentConstructor)", function (done) {
			tree.once('component:added', function (entity, component, componentConstructor) {
				entity.should.be.equal(tree);
				component.should.be.equal(positionA);
				componentConstructor.should.be.equal(Position);

				done();
			});

			tree.add(positionA);
		});

		it("should be chainable", function () {
			tree.add(positionA).should.be.equal(tree);
		});
	});

	describe("#remove(componentConstructor)", function () {
		it("should remove component", function () {
			tree.add(positionA);
			tree.has(Position).should.be.true;

			tree.remove(Position);
			tree.has(Position).should.be.false;

		});

		it("should emit `component:removed` event with (entity, component, componentConstructor)", function (done) {
			tree.add(positionA);

			tree.once('component:removed', function (entity, component, componentConstructor) {
				entity.should.be.equal(tree);
				component.should.be.equal(positionA);
				componentConstructor.should.be.equal(Position);

				done();
			});

			tree.remove(Position);
		});

		it("should be chainable", function () {
			tree.remove(Position).should.be.equal(tree);
		});
	});

	describe("#has(componentConstructor)", function () {
		it("should return true when `componentConstructor` is defined", function () {
			tree.add(positionA);
			tree.has(Position).should.be.true;
		});

		it("should return false when `componentConstructor` is undefined", function () {
			tree.has(Position).should.be.false;
		});
	});

	describe("#get(componentConstructor)", function () {
		it("should return defined `componentConstructor` instance", function () {
			tree.add(positionA);
			tree.get(Position).should.be.equal(positionA);
		});
	});
});