

class SystemSet
	!->
		@head = @tail = null

	add: (system-instance) !->
		if not @head
			@head = @tail = system
			system.$previous = system.$next = null;

		else
			node = @tail
			while node, node .= $previous
				if node.priority <= system.priority
					break

	remove: (system-instance) !->