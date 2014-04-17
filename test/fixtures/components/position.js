import Component from 'tombo/component.js';
import inherit from 'inherit';

export default Position;

function Position (x, y) {
	this.x = x;
	this.y = y;
}

inherit(Position, Component);