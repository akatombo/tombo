var tombo = require('tombo');

describe('tombo', function () {
	it('should alias main core modules (`tombo.Component` is `tombo.core.Component`)', function () {
		var moduleName;
		var modules = ['Component', 'Engine', 'Entity', 'System'];
		for (var i = 0; i < modules.length; i++) {
			moduleName = modules[i];
			if (tombo.core.hasOwnProperty(moduleName)) {
				tombo[moduleName].should.be.equal(tombo.core[moduleName]);
			}
		}
	});

	require('./core/');
});