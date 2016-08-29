class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.left = null;
		this.right = null;
		this.parent = null;
	}

	appendChild(node) {

		if (this.left !== null && this.right !== null){
			return;
		}

		if ( this.left == null) {
			this.left = node;
      		node.parent = this;

		} else if (this.right === null) {
			this.right = node;
     	 	node.parent = this;
		}
	}

	removeChild(node) {

		if (node !==this.left && node !==this.right) {
    		throw new Error("childNode not found");
    		return;

		} else if (this.left === node) {
			this.left = null;
			node.parent = null;

		} else if (this.right === node) {
			this.right = null;
			node.parent = null;
		} 
	}

	remove() {

		if (this.parent !== null ) {
			this.parent.removeChild(this);
		} else return;
	};

	swapWithParent() {
		
		if (this.parent === null) {
    		return;
		} 
		
		var bigParent = this.parent.parent,
			oldParent = this.parent,
			oldParentRight = this.parent.right,
			oldParentLeft = this.parent.left,
			left = this.left,
			right = this.right;

		if (left !== null) {
			left.remove();
		}

		if (right !== null) {
			right.remove();
		}

		this.remove();
		oldParent.remove();

		if (bigParent !== null) {
			bigParent.appendChild(this);
		}

		if ( this === oldParentLeft) {
			this.appendChild(oldParent);

			if (oldParentRight !== null) {
				oldParentRight.remove();
				this.appendChild(oldParentRight);
			}

			if (left !== null) {
				oldParent.appendChild(left);
			}

			if (right !== null) {
				oldParent.appendChild(right);
			}
		}
		
		if ( this === oldParentRight) {
			oldParentLeft.remove();
			this.appendChild(oldParentLeft)
			this.appendChild(oldParent);

			if (left !== null) {
				oldParent.appendChild(left);
			}

			if (right !== null) {
				oldParent.appendChild(right);
			}
		}
	}
}
//************************************8
class MaxHeap  {
	constructor() {

		this.root = null;
		this.parentNodes = [];
		this.numChlid = 0;
	}

	push(data, priority) {

		var newNode = new Node(data, priority);

		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
		this.numChlid++;
	}

	pop() {

		if ( this.root === null) {
			return;
		}

		var	detached = this.detachRoot();

		this.restoreRootFromLastInsertedNode(detached);
		this.shiftNodeDown(this.root);
		this.numChlid--;
		return detached.data;
	}

	detachRoot() {

		var oldRoot = this.root;

		if (this.parentNodes[0] === this.root) {
			this.parentNodes.shift();
		}

		this.root = null;
		return oldRoot;
	}
	
	restoreRootFromLastInsertedNode(detached) {
		
		if (this.parentNodes.length === 0) {
			return;
		}

		var oldLeft = detached.left,
			oldRight = detached.right,
			newRoot = this.parentNodes[this.parentNodes.length -1],
			newRootParent = newRoot.parent;

		newRoot.remove();
		this.root = newRoot;

		if (this.parentNodes.length === 1) {
			return;

		} else if (this.parentNodes.length === 2) {
			newRoot.appendChild(oldLeft);
			this.parentNodes.unshift(newRoot);
			this.parentNodes.pop();

		} else {
			newRoot.appendChild(oldLeft);
			newRoot.appendChild(oldRight);
			this.parentNodes.pop();	

			if (this.parentNodes.indexOf(newRootParent) === -1) {
				this.parentNodes.unshift(newRootParent);
			}		
		}
	}	

	size() {
		return this.numChlid;
	};

	isEmpty() {

		if (this.parentNodes.length === 0) {
			return true;
		} else return false;
	}

	clear() {

		this.root = null;
		this.parentNodes = [];
		this.numChlid = 0;
	}

	insertNode(node) {

		if (this.root === null) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);

			if (this.parentNodes[0].right !== null) {
				this.parentNodes.shift();
			}
		}
	}
	shiftNodeUp(node) {

		if (node.parent === null) {
			this.root = node;
			return;
		}

		if (node.priority > node.parent.priority  && node.parent !== null) {
			
			var parentIndex = this.parentNodes.indexOf(node.parent),
				nodeIndex = this.parentNodes.indexOf(node);

			if (nodeIndex !== -1) {
				this.parentNodes[nodeIndex] = node.parent;
			}
			if (parentIndex !== -1) {
				this.parentNodes[parentIndex] = node;				
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		} else return;
	}

	shiftNodeDown(node) {

		if (node === null || (node.left === null && node.right === null))
			return;

		if (node.right === null || node.left.priority > node.right.priority) {
			
			if (node.left.priority > node.priority) {
				
				var nodeIndex = this.parentNodes.indexOf(node),
					nodeLeftIndex = this.parentNodes.indexOf(node.left);

				if (this.root === node) {
					this.root = node.left;
				}

				if (nodeIndex !== -1) {
					this.parentNodes[nodeIndex] = node.left;
				}
				if (nodeLeftIndex !== -1) {
					this.parentNodes[nodeLeftIndex] = node;
				}

				node.left.swapWithParent();
				this.shiftNodeDown(node);

			} else return;
			 
		} else if (node.right.priority > node.left.priority && node.right.priority > node.priority) {

			var nodeIndex = this.parentNodes.indexOf(node),
				nodeRightIndex = this.parentNodes.indexOf(node.right);

			if (this.root === node) {
				this.root = node.right;
			}

			if (nodeIndex !== - 1) {
				this.parentNodes[nodeIndex] = node.right;
			}

			if (nodeRightIndex !== -1) {
				this.parentNodes[nodeRightIndex] = node;
			}

			node.right.swapWithParent();
			this.shiftNodeDown(node);

		} else return;		
	}
}
//************************************8

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


var q = new PriorityQueue();

q.push(1, 10)
q.push(2, 20)
q.push(3, 5)
q.push(4, 0)
q.push(5, 8)
q.push(6, 12) 
q.push(7, 17)
q.push(8, 15)
q.shift();
q.shift();
q.shift();
q.shift();
q.shift();
q.shift();

console.log(q)
