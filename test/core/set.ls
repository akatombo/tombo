should = require 'chai' .should!
{ Set } = require '../../build/'

describe 'new Set()' !->
	set = new Set!
	item = {}
	item2 = {}

	describe '#add(item)' (...) !->
		it "should add " !->
			set.add item
			set.add item2
			set.size.should.be.at.least(1);

	describe '#get(item)' (...) !->
		it "should be get item by index" !->
			set.get 0 .should.be.equal item

	describe '#swap(item , item2)' (...) !->
		it "should be swap position on two item " !->
			index0 = set.get 0
			index1 = set.get 1 
			set.swap item, item2
			index0.should.be.equal set.get 1
			index1.should.be.equal set.get 0

	describe '#empty' (...)!->
		it "should be return true if collection is empty" !->
			set = new Set
			set.empty.should.be.true
			set.add item
			set.empty.should.be.false

	describe '#size' (...)!->
		it "should be return size" !->
			set.size.should.be.equal 2

	describe '#remove(item)' (...) !->
		it "should be remove 1 item by reference" !->
			set.remove item2
			should.not.exist set.get 1

	describe '#removeAll()' (...) !->
		it "should be remove all item" !->
			set.add item2
			set.removeAll!empty.should.be.true