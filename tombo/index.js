/**
 * @module tombo
 * @main tombo
**/

var core = require('./core');
// var fsm = require('./fsm');

module.exports = {
	//core alias
	Component: core.Component,
	Engine: core.Engine,
	Family: core.Family,
	Entity: core.Entity,
	System: core.System,

	//modules
	core: core,
	// fsm: fsm,
};