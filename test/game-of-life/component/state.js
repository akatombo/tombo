import Component from 'tombo/component.js';
import inherit from 'inherit';

export default State;

inherit(State, Component);
function State (state) {
	this.current = state || State.DEAD;
	this.next = null;
}

State.ALIVE = 'alive';
State.DEAD = 'dead';
