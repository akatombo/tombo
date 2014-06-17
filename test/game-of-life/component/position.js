import Component from 'tombo/component.js';
import inherit from 'inherit';

export default Position;

inherit(Position, Component);
function Position (x, y) {
	this.x = x;
	this.y = y;
}
