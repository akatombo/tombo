var Component = require('tombo/core/component');
var inherit = require('inherit');

module.exports = Stats;

function Stats (health, mana) {
	this.health = health;
	this.mana = mana;
}

inherit(Stats, Component);