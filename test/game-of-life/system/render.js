import System from 'tombo/system.js';
import inherit from 'inherit';

import Position from '../component/position.js';
import State from '../component/state.js';

export default Render;

inherit(Render, System);
function Render () {
	this.shapes = {};
	this.shapes[State.ALIVE] = {};
	this.shapes[State.ALIVE] = {};

	this.shapes;
}

Render.prototype.require = {
	position: Position,
	state: State
};

Render.prototype.run = function (deltaTime, nodes, entities, engine) {
	var map = [];

	nodes.forEach(function (node) {
		var x = node.position.x;
		var y = node.position.y;
		var current = node.state.current;
		var next = node.state.next;

		if (!map[x]) {
			console.log(x, y, current);
			map[x] = [];
		}

		map[x][y] = current === State.ALIVE ? 'x' : ' ';
	});

	map.forEach(function (_, i) {
		console.log(i + '. ' + _.join(''));
	});
};
