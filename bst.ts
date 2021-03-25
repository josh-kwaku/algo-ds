class BST {
    root: INode;
    min: INode;
    max: INode;

    constructor() {
        this.root = null;
        this.min = null;
        this.max = null;
    }

    public insert(node: INode, key: any, parent: INode) {
        if (node === null) {
            const node = BST.makeNode(key, parent);
            if (this.root === null) {
                this.root = node;
                this.max = node;
                this.min = node;
                return;
            }
            node.parent = parent;
            return node;
        }

        if (node.key === key) {
            node.counter += 1;
            return;
        }

        if (node.key < key) {
            const newNode = this.insert(node.right, key, node);
            parent.right = newNode;
            if (key > this.max.key) this.max = newNode;
            if (key < this.min.key) this.min = newNode;
            return;
        }

        if (node.key > key) {
            const newNode = this.insert(node.left, key, node);
            if (key > this.max.key) this.max = newNode;
            if (key < this.min.key) this.min = newNode;
            parent.left = newNode;
            return;
        }

    }

    public traverse(root: INode) {
        if (root !== null) {
            this.traverse(root.left);
            console.log(root.key);
            this.traverse(root.right);
        }
    }

    public printMaxAndMin() {
        console.log("Max: ", this.max);
        console.log("Min: ", this.min);
    }
    private static makeNode(key: any, parent: INode): INode {
        return {
            left: null,
            right: null,
            parent,
            key,
            counter: 0
        }
    }
}

interface INode {
    left: INode,
    right: INode,
    parent: INode,
    key: any,
    counter: number
}