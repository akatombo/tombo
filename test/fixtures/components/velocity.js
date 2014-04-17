import Component from 'tombo/component.js';
import inherit from 'inherit';

export default Velocity;

function Velocity (x, y) {
	this.x = x;
	this.y = y;
}

inherit(Velocity, Component);