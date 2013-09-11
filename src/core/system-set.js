var augment = require('augment');

var SystemSet = augment(Object, function () {
	/**
	 * @class SystemSet
	 * @constructor
	**/
	this.constructor = function () {
		/**
		 * @property head
		 * @type {System|null}
		 * @default null
		**/
		this.head = null;

		/**
		 * @property tail
		 * @type {System|null}
		 * @default null
		**/
		this.tail = null;
	};

	/**
	 * Add a system, sort by priority
	 *
	 * @method add
	 * @param {System} system
	**/
	this.add = function (system) {
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

	/**
	 * Remove a system
	 *
	 * @method remove
	 * @param {System} system
	**/
	this.remove = function (system) {
		if (this.head === system) {
			this.head = this.head.$next;
		}
		if (this.tail === system) {
			this.tail = this.tail.$previous;
		}
		if (system.$previous) {
			system.$previous.$next = system.$next;
		}
		if (system.$next) {
			system.$next.$previous = system.$previous;
		}
	};

	/**
	 * Remove all system
	 *
	 * @method clear
	**/
	this.clear = function () {
		var system;
		while (this.head) {
			system = this.head;
			this.head = this.head.$next;

			system.$previous = system.$next = null;
		}

		this.tail = null;
	};

	/**
	 * get a system with his constructor
	 *
	 * @method get
	 * @param {Function} systemConstructor
	 * @return {System}
	**/
	//http://jsperf.com/instanceof-vs-isprototypeof
	this.get = function (systemConstructor) {
		for (var system = this.head; system; system = system.$next) {
			if (system instanceof systemConstructor) {
				return system;
			}
		}

		return null;
	};
});

module.exports = SystemSet;