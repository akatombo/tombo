var version = require('../component.json').version;
var parts = version.split('.');

module.exports = {
	version: {
		full: version,
		major: parts[0],
		minor: parts[1],
		dot: parts[2]
	},

	Component: require('./core/component'),
	ComponentMatchingFamily: require('./core/component-matching-family'),
	Entity: require('./core/entity'),
	Node: require('./core/node'),
	NodeSet: require('./core/node-set'),
	Set: require('./core/system-set'),
	System: require('./core/system'),
	SystemSet: require('./core/system-set')
};