/**
 * @class Component
 * @constructor
**/
function Component (object) {
	for (var key in object) {
		if (object.hasOwnProperty(key)) {
			this[key] = object[key];
		}
	}
}


module.exports = Component;
