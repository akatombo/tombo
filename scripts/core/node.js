var enhance = require('enhance');

var Node = enhance(Object, function () {});

Node.extendFrom = function (schema) {
	var definition = {
		$constructors: {}
	};

	for (var property in schema) {
		if (schema.hasOwnProperty(property)) {
			definition[property] = null;
			definition.$constructors[property] = schema[property];
		}
	}

	return enhance(Node, definition);
};

module.exports = Node;