/**
 * @module tombo
 * @main tombo
**/

var core = require('./core');

module.exports = {
	Component: core.Component,
	Engine: core.Engine,
	Entity: core.Entity,
	System: core.System,

	core: core
};