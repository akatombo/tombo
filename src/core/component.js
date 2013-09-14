var enhance = require('enhance');

var Component = enhance(Object, function () {
	this.constructor = function () {};
});

module.exports = Component;
