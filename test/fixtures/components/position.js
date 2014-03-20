var Component = require('tombo/component');
var inherit = require('inherit');

module.exports = Position;

function Position (x, y) {
	this.x = x;
	this.y = y;
}

inherit(Position, Component);