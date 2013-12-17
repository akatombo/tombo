/**
 * @module Core
**/

var enhance = require('enhance');

module.exports = enhance(Object, function () {
	/**
	 * @class Set
	 * @constructor
	**/
	this.constructor = function Set () {
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
	 * Add a item
	 *
	 * @method add
	 * @chainable
	 * @param {Object} item
	 * @return {Set}
	**/
	this.add = function add (item) {
		if (!this.head) {
			this.head = this.tail = item;
		} else {
			this.tail.$next = item;
			item.$previous = this.tail;
			this.tail = item;
		}

		return this;
	};

	/**
	 * Remove a item
	 *
	 * @method remove
	 * @chainable
	 * @param {any} item
	 * @return {Set}
	**/
	this.remove = function remove (item) {
		if (this.head === item) {
			this.head = item.$next;
		}

		if (this.tail === item) {
			this.tail = item.$previous;
		}

		if (item.$previous) {
			item.$previous.$next = item.$next;
		}

		if (item.$next) {
			item.$next.$previous = item.$previous;
		}

		return this;
	};

	/**
	 * Remove all items
	 *
	 * @method removeAll
	 * @chainable
	 * @return {Set}
	**/
	this.removeAll = function removeAll () {
		var item;

		while (this.head) {
			item = this.head;
			this.head = item.$next;

			item.$previous = item.$next = null;
		}

		this.tail = null;
		return this;
	};

	
	/**
	 * get a item with his index
	 *
	 * @method get
	 * @param {Number} index
	 * @return {Object|null}
	**/
	this.get = function get (index) {
		var counter = 0;
		for (var item = this.head; item; item = item.$next) {
			if (counter === index) {
				return item;
			}
			counter++;
		}

		return null;
	};

	/**
	 * swap two items
	 *
	 * @method swap
	 * @chainable
	 * @param {any} a
	 * @param {any} b
	 * @return {Set}
	**/
	this.swap = function swap (a, b) {
		if (a.$previous === b) {
			a.$previous = b.$previous;
			b.$previous = a;
			b.$next = a.$next;
			a.$next = b;
		} else if (b.$previous === a) {
			b.$previous = a.$previous;
			a.$previous = b;
			a.$next = b.$next;
			b.$next = a;
		} else {
			var c = a.$previous;
			a.$previous = b.$previous;
			b.$previous = c;
			c = a.$next;
			a.$next = b.$next;
			b.$next = c;
		}

		if (this.head === a) {
			this.head = b;
		} else if (this.head === b) {
			this.head = a;
		}

		if (this.tail === a) {
			this.tail = b;
		} else if (this.tail === b) {
			this.tail = a;
		}

		if (a.$previous) {
			a.$previous.$next = a;
		}

		if (b.$previous) {
			b.$previous.$next = b;
		}

		if (a.$next) {
			a.$next.$previous = a;
		}

		if (b.$next) {
			b.$next.$previous = b;
		}

		return this;
	};

	this.insertionSort = function insertionSort () {

	};

	return {
		/**
		 * empty anchor for quick for looping
		 * @exemple
		 *		for (var item = items.prehead; item = item.$next;) {}
		 *		// instead of
		 *		for (var item = items.head; item; item = item.$next) {}
		 * @property prehead
		 * @type {Object}
		 * @readonly
		**/
		// TODO check perf for caching it inside this
		get prehead () {
			var that = this;
			return {
				$next: that.head
			};
		},
		/**
		 * set length
		 *
		 * @property length
		 * @type {Number}
		 * @readonly
		**/
		get size () {
			var counter = 0;
			for (var item = this.head; item; item = item.$next) {
				counter++;
			}
			return counter;
		},
		/**
		 * true if set is empty
		 *
		 * @property empty
		 * @type {Boolean}
		**/
		get empty () {
			return this.head === null;
		}
	};
});