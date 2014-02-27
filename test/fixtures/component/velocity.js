var Component = require('tombo/component');
var inherit = require('inherit');

module.exports = Velocity;

function Velocity (x, y) {
	this.x = x;
	this.y = y;
}

inherit(Velocity, Component);