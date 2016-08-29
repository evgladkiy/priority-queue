const Node = require('./node.js');

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

module.exports = MaxHeap;
