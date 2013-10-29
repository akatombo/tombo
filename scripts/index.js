module.exports = {
	version: {
		name: '',
		full: '0.0.0',
		major: 0,
		minor: 0,
		dot: 0
	},

	Node: require('src/core/node'),
	Component: require('src/core/component'),
	Entity: require('src/core/entity'),
	System: require('src/core/system'),

	Set: require('src/core/system-set'),
	NodeSet: require('src/core/node-set'),
	SystemSet: require('src/core/system-set'),

	ComponentMatchingFamily: require('src/core/component-matching-family')
};