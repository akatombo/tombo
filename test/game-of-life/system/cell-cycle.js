import System from 'tombo/system.js';
import inherit from 'inherit';

import Position from '../component/position.js';
import State from '../component/state.js';

export default CellCycle;


inherit(CellCycle, System);
function CellCycle () {}

CellCycle.prototype.require = {
	position: Position,
	state: State
};

CellCycle.prototype.run = function (deltaTime, nodes) {
	nodes.forEach(function (node) {
		if (node.position.x === 1) {
			node.state.current = State.ALIVE;
		}
	});
};
