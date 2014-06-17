import Engine from 'tombo/engine.js';

import Cell from './entity/cell.js';

import Position from './component/position.js';
import State from './component/state.js';

import Render from './system/render.js';
import CellCycle from './system/cell-cycle.js';

var map = [
	[0, 1, 0, 0, 1, 1],
	[0, 0, 0, 0, 1, 0],
	[0, 1, 1, 0, 0, 0]
];

var engine = new Engine()
	.add(new Render())
	.add(new CellCycle())
;

map.forEach(function (_, x) {
	_.forEach(function (state, y) {
		engine.add(new Cell(x, y, state));
	});
});