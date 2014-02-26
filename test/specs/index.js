var tombo = require('tombo');

describe('tombo', function () {
	it('all modules should be requirable (tombo.Component is require "tombo/component")', function () {
		for (var moduleName in tombo) {
			if (tombo.hasOwnProperty(moduleName)) {
				tombo[moduleName].should.be.equal(require('tombo/' + moduleName.toLowerCase()));
			}
		}
	});

	require('./entity');
	require('./family');
	require('./engine');
});