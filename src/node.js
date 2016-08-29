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

module.exports = Node;