class BST {
    constructor() {
        this.root = null;
        this.minNode = null;
        this.maxNode = null;
    }
    insert(node, key, parent) {
        if (node === null) {
            const newNode = BST.makeNode(key, parent);

            if (this.root === null) {
                this.root = newNode;
                this.maxNode = newNode;
                this.minNode = newNode;
            } else {
                if (key < parent.key) parent.left = newNode;
                if (key > parent.key) parent.right = newNode;
                if (key > this.maxNode.key) this.maxNode = newNode;
                if (key < this.minNode.key) this.minNode = newNode;
            }

            return;
        }

        if (node.key === key) {
            node.counter += 1;
            return;
        }
        if (node.key < key) {
            return this.insert(node.right, key, node);
        }
        if (node.key > key) {
            return this.insert(node.left, key, node);
        }
        return;
    }

    search(node, key) {
        if (node === null) return null;

        if(node.key === key) return node;

        if (node.key < key) return this.search(node.right, key);

        if (node.key > key) return this.search(node.left, key)
    }

    max(node) {
        if (node === null) return null;
        while (node.right !== null) {
            node = node.right
        }
        return node;
    }

    min(node) {
        if (node === null) return null;
        while (node.left !== null) {
            node = node.left
        }
        return node;
    }

    /**
     * The successor of a node is the minimum element in it's right subtree. If it doesn't have a right subtree then it's successor is it's first right ancestor
     * @param {*} node 
     * @returns 
     */
    successor(node) {
        if (node === null) return null;

        if (node.right !== null) return this.min(node.right)
        
        while (node.parent !== null) {
            if (node.parent.right === node) node = node.parent;
            else return node.parent
        }

        return null;
    }

    /**
     * The predecessor of a node is the maximum element in it's left subtree. If it doesn't have a left subtree then it's predecessor is it's first left ancestor
     * @param {*} node 
     * @returns 
     */
    predecessor(node) {
        if (node === null) return null;

        if (node.left !== null) return this.max(node.left)
        
        while (node.parent !== null) {
            if (node.parent.left === node) node = node.parent;
            else return node.parent
        }

        return null;
    }

    delete(node) {
        if (node === null) return null;

        if ((this.isLeaf(node))) {
            return this.unlinkFromParent(node);
        }

        if (!this.hasTwochildren(node)) {
            return this.relinkChildren(node);
        } else {
            let successor = this.successor(node);
            let key = successor.key;
            this.relinkChildren(successor);
            node.key = key;
        }
        return;
    }

    unlinkFromParent(node) {
        if (node.parent.left === node) node.parent.left = null;
        else node.parent.right = null;
        node.parent = null;
        return null;
    }

    isLeaf(node) {
        if (node.left === null && node.right === null) return true;
        return false;
    }

    hasTwochildren(node) {
        if (node.left !== null && node.right !== null) return true;
        return false;
    }

    relinkChildren(node) {
        console.log(node);
        if (node.parent.left === node) {
            if (this.isLeaf(node)) {
                return this.unlinkFromParent(node);
            }

            if (node.left !== null && node.right === null) {
                node.parent.left = node.left
                node.parent.left.parent = node.parent;
            }

            if (node.left === null && node.right !== null) {
                node.parent.left = node.right
                node.parent.left.parent = node.parent;
            }
        }

        if (node.parent.right === node) {
            if (this.isLeaf(node)) {
                return this.unlinkFromParent(node);
            }

            if (node.left !== null && node.right === null) {
                node.parent.right = node.left
                node.parent.right.parent = node.parent;
            }

            if (node.left === null && node.right !== null) {
                node.parent.right = node.right
                node.parent.right.parent = node.parent;
            }
        }
        node.parent = null;
        return;
    }

    
    sort() {
        if (this.root === null) return null
        let min = this.min(this.root);
        while (min !== null) {
            console.log(min.key);
            min = this.successor(min);
        }
    }


    traverse(root) {
        if (root) {
            this.traverse(root.left);
            console.log(root.key);
            this.traverse(root.right);
        }
    }
    
    printMaxAndMin() {
        console.log("Max: ", this.max);
        console.log("Min: ", this.min);
    }
    static makeNode(key, parent) {
        return {
            left: null,
            right: null,
            parent,
            key,
            counter: 1
        };
    }
}
const bst = new BST();
bst.insert(bst.root, 5, null);
// console.log(bst.root);
bst.insert(bst.root, 4, null);
// console.log(bst.root);
bst.insert(bst.root, 9, null);
// console.log(bst.root);
bst.insert(bst.root, 6, null);
// console.log(bst.root);
bst.insert(bst.root, 10, null);
// console.log(bst.root);
bst.insert(bst.root, 8, null);
bst.sort();
// bst.insert(bst.root, 5, null);
// console.log(bst.root);
// bst.traverse(bst.root);
// console.log(bst.root.left);
// bst.printMaxAndMin();
// const node = bst.search(bst.root, 9)
// bst.delete(node);
// bst.traverse(bst.root);
// console.log(bst.search(bst.root, 10))
// console.log(bst.successor(bst.search(bst.root, 10)))
// console.log(bst.predecessor(bst.search(bst.root, 10)))