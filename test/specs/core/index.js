var core = require('tombo').core;

describe('core', function () {
	it('should be requirable (require "tombo/core")', function () {
		core.should.be.equal(require('tombo/core'));
	});

	it('all core modules should be requirable (tombo.core.Component is require "tombo/core/component")', function () {
		for (var moduleName in core) {
			if (core.hasOwnProperty(moduleName)) {
				core[moduleName].should.be.equal(require('tombo/core/' + moduleName.toLowerCase()));
			}
		}
	});

	require('./entity');
	require('./family');
	require('./system');
});