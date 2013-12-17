/* jshint -W079 */
/**
 * @module Core
**/

var enhance = require('enhance');
var Set = require('./set');

var SystemSet = enhance(Set, function (base) {
	/**
	 * @class SystemSet
	 * @extends Set
	 * @constructor
	**/
	this.constructor = function SystemSet () {
		base.constructor.call(this);
	};

	/**
	 * Add a system, sort by priority
	 *
	 * @method add
	 * @param {System} system
	**/
	this.add = function add (system) {
		if (this.head) {
			this.head = this.tail = system;
			system.$next = system.$previous = null;
		} else {
			for (var node = this.tail; node; node = node.$previous) {
				if (node.priority <= system.priority) {
					break;
				}
			}

			if (node === this.tail) {
				this.tail.$next = system;
				system.$previous = this.tail;
				system.$next = null;
				this.tail = system;
			} else if (!node) {
				system.$next = this.head;
				system.$previous = null;
				this.head.$previous = system;
				this.head = system;
			} else {
				system.$next = node.$next;
				system.$previous = node;
				node.$next.$previous = system;
				node.$next = system;
			}
		}

		return this;
	};
});

/**
	 * get a item with his constructor
	 *
	 * @method get
	 * @param {Function} itemConstructor
	 * @return {Object|null}
	
	//http://jsperf.com/instanceof-vs-isprototypeof
	this.get = function get (itemConstructor) {
		for (var item = this.head; item; item = item.$next) {
			if (item instanceof itemConstructor) {
				return item;
			}
		}

		return null;
	};
**/

module.exports = SystemSet;