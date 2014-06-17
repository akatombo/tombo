import Entity from 'tombo/entity.js';

import Position from '../component/position.js';
import State from '../component/state.js';

export default Cell;

inherit(Cell, Entity);
function Cell (x, y, alive) {
	this.add(new Position(x, y));
	this.add(new State(alive ? State.ALIVE : State.DEAD));
}