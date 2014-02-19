/**
 * @module tombo
 * @main tombo
**/

var core = require('./core');

module.exports = {
	Component: core.Component,
	Engine: core.Engine,
	Family: core.Family,
	Entity: core.Entity,
	System: core.System,

	core: core
};