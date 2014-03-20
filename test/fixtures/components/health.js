var Component = require('tombo/component');
var inherit = require('inherit');

module.exports = Health;

function Health (max, current) {
	this.max = max;
	this.current = current || max;
}

inherit(Health, Component);