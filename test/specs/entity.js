import Entity from 'tombo/entity.js';
// import Position from 'game-of-life/component/position.js';

var top = new Position(0, 0);
var bottom = new Position(1, 1);

describe("Entity", function () {
	var cell;

	beforeEach(function () {
		cell = new Entity();
	});

	describe("#add(component)", function () {
		it("should add `component`", function () {
			cell.has(Position).should.be.false;

			cell.add(top);
			cell.has(Position).should.be.true;
			cell.get(Position).should.be.equal(top);
		});

		it("should overwrite with `component`", function () {
			cell.has(Position).should.be.false;

			cell.add(top);
			cell.has(Position).should.be.true;
			cell.get(Position).should.be.equal(top);

			cell.add(bottom);
			cell.has(Position).should.be.true;
			cell.get(Position).should.be.equal(bottom);
		});

		it("should emit `component:added` event with (entity, component, componentConstructor)", function (done) {
			cell.once('component:added', function (entity, component, componentConstructor) {
				entity.should.be.equal(cell);
				component.should.be.equal(top);
				componentConstructor.should.be.equal(Position);

				done();
			});

			cell.add(top);
		});

		it("should be chainable", function () {
			cell.add(top).should.be.equal(cell);
		});
	});

	describe("#remove(componentConstructor)", function () {
		it("should remove component", function () {
			cell.add(top);
			cell.has(Position).should.be.true;

			cell.remove(Position);
			cell.has(Position).should.be.false;

		});

		it("should emit `component:removed` event with (entity, component, componentConstructor)", function (done) {
			cell.add(top);

			cell.once('component:removed', function (entity, component, componentConstructor) {
				entity.should.be.equal(cell);
				component.should.be.equal(top);
				componentConstructor.should.be.equal(Position);

				done();
			});

			cell.remove(Position);
		});

		it("should be chainable", function () {
			cell.remove(Position).should.be.equal(cell);
		});
	});

	describe("#has(componentConstructor)", function () {
		it("should return true when `componentConstructor` is defined", function () {
			cell.add(top);
			cell.has(Position).should.be.true;
		});

		it("should return false when `componentConstructor` is undefined", function () {
			cell.has(Position).should.be.false;
		});
	});

	describe("#has(componentConstructor)", function () {
		it("should return defined `componentConstructor` instance", function () {
			cell.add(top);
			cell.get(Position).should.be.equal(top);
		});
	});
});