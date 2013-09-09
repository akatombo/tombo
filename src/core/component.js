var augment = require('augment');

var Component = augment(Object, function () {
	this.constructor = function () {};
});

module.exports = Component;
