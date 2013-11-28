require! {
	Emitter: 'emitter'
}

class NodeSet extends Emitter
	!->
		@head = @tail = null

	/**
	 * Add a node
	 *
	 * @method add
	 * @chainable
	 * @param {Node} node
	 * @return {NodeSet}
	**/
	add: (node) ->
		if not @head
			@head = @tail = node
			node.$next = node.$previous = null

		else
			@tail.$next = node
			node.$previous = @tail
			node.$next = null
			@tail = node

		@emit 'node:added' node
		@

	/**
	 * Remove a node
	 *
	 * @method remove
	 * @chainable
	 * @param {Node} node
	 * @return {NodeSet}
	**/
	remove: (node) ->
		if @head
			@head .= $next

		if @tail
			@tail .= $previous

		# TODO: think about set $previous and $next to null
		if node.$previous
			node.$previous.$next = node.$next

		if node.$next
			node.$next.$previous = node.$previous

		@emit 'node:removed' node
		@


	/**
	 * Remove all system
	 *
	 * @method clear
	 * @chainable
	 * @return {NodeSet}
	**/
	clear: !->
		while @head
			node = @head
			@head .= $next
			node.$previous = null
			node.$next = null

			@emit 'node:removed' node

		@tail = null


	/**
	 * node-set size
	 *
	 * @property clear
	 * @type {Number}
	**/
	empty:~ ->
		@head is null


	/**
	 * swap node-a and node-b position
	 *
	 * @method swap
	 * @chainable
	 * @return {NodeSet}
	**/
	swap: (node-a, node-b) ->
		if node-a.$previous is node-b
			node-a.$previous = node-b.$previous
			node-b.$previous = node-a

			node-b.$next = node-a.$next
			node-a.$next = node-b

		else if node-b.$previous is node-a
			node-b.$previous = node-a.$previous
			node-a.$previous = node-b

			node-a.$next = node-b.$next
			node-b.$next = node-a

		else
			_ = node-a.$previous
			node-a.$previous = node-b.$previous
			node-b.$previous = _

			_ = node-a.$next
			node-a.$next = node-b.$next
			node-b.$next = _


		if @head is node-a
			@head = node-b

		else if @head is node-b
			@head = node-a


		if @tail is node-a
			@tail = node-b

		else if @tail is node-b
			@tail = node-a

		if node-a.$previous
			node-a.$previous.$next = node-a

		if node-b.$previous
			node-b.$previous.$next = node-b

		if node-a.$next
			node-a.$next.$previous = node-a

		if node-b.$next
			node-b.$next.$previous = node-b


module.exports = NodeSet