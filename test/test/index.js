var tombo = require('tombo');

describe('tombo', function () {
	it('should alias all core modules (`tombo.Component` is `tombo.core.Component`)', function () {
		for (var moduleName in tombo.core) {
			if (tombo.core.hasOwnProperty(moduleName)) {
				tombo[moduleName].should.be.equal(tombo.core[moduleName]);
			}
		}
	});

	require('./core/');
});