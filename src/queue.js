const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		this.heap.push(data, priority);
		if ( this.maxSize < this.heap.numChlid) {
			throw new Error("maxSize < numChlid");
		}
	}
	shift() {
		if (this.heap.parentNodes.length === 0) {
			throw new Error('Queue heap not found, queue is empty');
		}
		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
