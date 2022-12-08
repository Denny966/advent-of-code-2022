export class TreeNode {
    public key: string;
    public value: any;
    public parent: string;
    public children: TreeNode[];

    constructor(key: string, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.children = [];
    }
}

export class Tree {
    public root: TreeNode;

    constructor(key: string, value = key) {
        this.root = new TreeNode(key, value);
    }

    nodes = (node: TreeNode, children: TreeNode[]): TreeNode[] => {
        if (node.children.length) {
            for (let child of node.children) {
                this.nodes(child, children);
            }
            return children;
        } else {
            if (node.key !== node.value) {
                children.push(node);
            }
            return children;
        }
    };

    insert = (parentNodeKey: string[], key: string, value = key) => {
        const node = this.findInDirectory(parentNodeKey);
        if (node != null) {
            node.children.push(new TreeNode(key, value, node.key));
            return true;
        }
        return false;
    };

    find = (key: string, currentNode: TreeNode) => {
        if (key === currentNode.key) {
            return currentNode;
        }
        for (let index = 0; index < currentNode.children.length; index++) {
            const element = currentNode.children[index];
            const result = this.find(key, element);
            if (result != null) {
                return result;
            }
        }
        return undefined;
    };

    findInDirectory = (directory: string[]) => {
        let currentNode = this.root;
        for (let index = 0; index < directory.length; index++) {
            const path = directory[index];

            currentNode = this.find(path, currentNode);
            if (currentNode == null) return undefined;
        }

        return currentNode;
    };
}
